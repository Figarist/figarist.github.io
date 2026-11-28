#!/usr/bin/env python3
"""Check i18n key parity across all 5 locales and detect Ukrainian Cyrillic leaks."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parent.parent
LOCALES = ("en", "uk", "ru", "ko", "pl")
UK_CYRILLIC_RE = re.compile(r"[єіїґЄІЇҐ]")


def load_yaml(path: Path) -> Any:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def scan_uk_leaks(obj: Any, path_prefix: str, errors: list[str]) -> None:
    if isinstance(obj, str):
        match = UK_CYRILLIC_RE.search(obj)
        if match:
            errors.append(
                f"{path_prefix}: Ukrainian Cyrillic leak ({match.group(0)!r}) in {obj[:80]!r}"
            )
    elif isinstance(obj, list):
        for idx, item in enumerate(obj):
            scan_uk_leaks(item, f"{path_prefix}[{idx}]", errors)
    elif isinstance(obj, dict):
        for key, val in obj.items():
            scan_uk_leaks(val, f"{path_prefix}.{key}", errors)


def check_dict_keys(
    ref: dict[str, Any],
    target: dict[str, Any],
    label: str,
    errors: list[str],
) -> None:
    ref_keys = set(ref.keys())
    tgt_keys = set(target.keys())
    missing = sorted(ref_keys - tgt_keys)
    extra = sorted(tgt_keys - ref_keys)
    if missing:
        errors.append(f"{label}: missing keys {missing}")
    if extra:
        errors.append(f"{label}: extra keys {extra}")


def main() -> int:
    errors: list[str] = []
    data_dir = ROOT / "_data"

    # 1. Per-locale files in _data/<lang>/
    ref_strings = load_yaml(data_dir / "en" / "strings.yml")
    ref_privacy = load_yaml(data_dir / "en" / "privacy.yml")
    ref_glossary = load_yaml(data_dir / "en" / "glossary.yml")
    ref_home = load_json(data_dir / "en" / "home.json")
    ref_tutoring = load_json(data_dir / "en" / "tutoring.json")

    for lang in LOCALES:
        lang_dir = data_dir / lang
        strings = load_yaml(lang_dir / "strings.yml")
        privacy = load_yaml(lang_dir / "privacy.yml")
        glossary = load_yaml(lang_dir / "glossary.yml")
        home = load_json(lang_dir / "home.json")
        tutoring = load_json(lang_dir / "tutoring.json")

        if lang != "en":
            check_dict_keys(ref_strings, strings, f"_data/{lang}/strings.yml", errors)
            check_dict_keys(ref_privacy, privacy, f"_data/{lang}/privacy.yml", errors)
            if len(privacy.get("sections", [])) != len(ref_privacy.get("sections", [])):
                errors.append(
                    f"_data/{lang}/privacy.yml: section count {len(privacy.get('sections', []))} != {len(ref_privacy.get('sections', []))}"
                )
            check_dict_keys(ref_glossary, glossary, f"_data/{lang}/glossary.yml", errors)
            for term_id, term_ref in ref_glossary.items():
                if term_id in glossary:
                    check_dict_keys(
                        term_ref,
                        glossary[term_id],
                        f"_data/{lang}/glossary.yml[{term_id}]",
                        errors,
                    )
            check_dict_keys(ref_home, home, f"_data/{lang}/home.json", errors)
            check_dict_keys(ref_tutoring, tutoring, f"_data/{lang}/tutoring.json", errors)

            ref_courses = {c["slug"]: c for c in ref_tutoring.get("courses", [])}
            tgt_courses = {c["slug"]: c for c in tutoring.get("courses", [])}
            check_dict_keys(
                ref_courses, tgt_courses, f"_data/{lang}/tutoring.json[courses]", errors
            )
            for slug, c_ref in ref_courses.items():
                if slug in tgt_courses:
                    check_dict_keys(
                        c_ref,
                        tgt_courses[slug],
                        f"_data/{lang}/tutoring.json[courses.{slug}]",
                        errors,
                    )
            if "minecraft_evidence" in ref_tutoring and "minecraft_evidence" in tutoring:
                check_dict_keys(
                    ref_tutoring["minecraft_evidence"],
                    tutoring["minecraft_evidence"],
                    f"_data/{lang}/tutoring.json[minecraft_evidence]",
                    errors,
                )

        if lang != "uk":
            scan_uk_leaks(strings, f"_data/{lang}/strings.yml", errors)
            scan_uk_leaks(privacy, f"_data/{lang}/privacy.yml", errors)
            scan_uk_leaks(glossary, f"_data/{lang}/glossary.yml", errors)
            scan_uk_leaks(home, f"_data/{lang}/home.json", errors)
            scan_uk_leaks(tutoring, f"_data/{lang}/tutoring.json", errors)

    # 2. Shared YAML files
    for game_file in sorted((data_dir / "game_pages").glob("*.yml")):
        data = load_yaml(game_file)
        for lang in LOCALES:
            if lang not in data:
                errors.append(f"{game_file.relative_to(ROOT)}: missing locale {lang!r}")
            elif lang != "uk":
                scan_uk_leaks(data[lang], f"{game_file.relative_to(ROOT)}[{lang}]", errors)

    profile = load_yaml(data_dir / "tutoring" / "profile.yml")
    for lang in LOCALES:
        if lang not in profile.get("translations", {}):
            errors.append(f"_data/tutoring/profile.yml: missing translations.{lang}")
        elif lang != "uk":
            scan_uk_leaks(
                profile["translations"][lang],
                f"_data/tutoring/profile.yml[translations.{lang}]",
                errors,
            )

    settings = load_yaml(data_dir / "tutoring" / "settings.yml")
    conds = settings.get("conditions", {})
    for key, val in conds.items():
        if key == "technical_requirements":
            for track, track_map in val.items():
                for lang in LOCALES:
                    if lang not in track_map:
                        errors.append(
                            f"_data/tutoring/settings.yml: missing conditions.technical_requirements.{track}.{lang}"
                        )
                    elif lang != "uk":
                        scan_uk_leaks(
                            track_map[lang],
                            f"_data/tutoring/settings.yml[technical_requirements.{track}.{lang}]",
                            errors,
                        )
        elif isinstance(val, dict):
            for lang in LOCALES:
                if lang not in val:
                    errors.append(
                        f"_data/tutoring/settings.yml: missing conditions.{key}.{lang}"
                    )
                elif lang != "uk":
                    scan_uk_leaks(
                        val[lang], f"_data/tutoring/settings.yml[conditions.{key}.{lang}]", errors
                    )

    for case_file in sorted((data_dir / "tutoring" / "cases").glob("*.yml")):
        if case_file.name == "case-template.yml":
            continue
        case_data = load_yaml(case_file)
        trans = case_data.get("translations", {})
        for lang in LOCALES:
            if lang not in trans:
                errors.append(f"{case_file.relative_to(ROOT)}: missing translations.{lang}")
            elif lang != "uk":
                scan_uk_leaks(
                    trans[lang], f"{case_file.relative_to(ROOT)}[translations.{lang}]", errors
                )

    tools = load_yaml(data_dir / "tools.yml")
    for tool in tools:
        if "locale_paths" in tool:
            for lang in LOCALES:
                if lang not in tool["locale_paths"]:
                    errors.append(
                        f"_data/tools.yml[{tool.get('id')}]: missing locale_paths.{lang}"
                    )

    if errors:
        print(f"FAIL: {len(errors)} i18n parity/leak issue(s) found:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print(
        f"PASS: i18n parity verified across {len(LOCALES)} locales ({', '.join(LOCALES)}) with 0 Ukrainian leaks"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
