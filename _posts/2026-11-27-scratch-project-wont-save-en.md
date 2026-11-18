---
layout: "post"
title: "Scratch Project Won't Save: How Not to Lose the Game"
description: "Scratch says \"Project could not save\"? Save the .sb3 to your computer, reload and load the game back. Plus how to shrink a project that is too large."
last_modified_at: null
date: "2026-11-27 10:00:00 +0200"
lang: "en"
page_id: "scratch-project-wont-save"
permalink: "/blog/scratch-project-wont-save/"
excerpt: "Sometimes Scratch just won't save a project. In lessons we have a simple routine: first the .sb3 file goes to your computer, then you reload, then the file goes back into the editor."
category: "education"
categories:
  - "education"
tags:
  - "scratch"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/pyscratch-inspector.webp"
image_alt: "The Inspector (.sb3) tab in pyScratch (Ukrainian interface): Scratch limits and compression of large images"
focus_keyword: "scratch project won't save"
seo_title: "Scratch Project Won't Save? First Aid and Causes"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: false
hidden: null
redirect_from: null
toc: true
published: true
fmContentType: "Post"
---

The most annoying thing that can happen in a Scratch lesson: a child has spent ages building a game, and the Scratch project won't save. **"Project could not save."** sits at the top of the screen, and "Try Again" doesn't help. Usually the connection is to blame. It has always been like this, so in lessons we have a simple routine.

## First aid: the file first, everything else later

Don't reload the page until the project is on your computer. After a reload, Scratch may open the last version from the server, and anything that never made it there is gone.

1. Save a copy to your computer. In the File menu, choose **Save to your computer**. The "Download" button right in the error message does the same thing. The browser saves an `.sb3` file, and the whole game is inside it: sprites, scripts, costumes and sounds.
2. Reload the page. If Scratch shows that you've been signed out, sign in again.
3. Load the file back. In the File menu, choose "Load from your computer" and pick the `.sb3` you just saved. If Scratch asks "Replace contents of the current project?", say yes.
4. Keep working. To check, click "File → Save now". If you see "Project saved.", you're fine.

Sometimes the server still won't take the project after all that. Then we just keep working and save the file to the computer again every so often. At least everything is in the `.sb3`, and the game can go back into the editor later.

## Why a Scratch project won't save

The [Scratch Wiki](https://en.scratch-wiki.info/wiki/What_does_%22project_could_not_save%22_mean%3F) gives three reasons for the "Project could not save" message:

- you've been signed out;
- the computer lost its internet connection;
- the project is too large.

It also suggests checking them in order and trying to save again after each step: first the internet, then, in a new tab, whether you're signed in to the right account, and only then look for heavy files.

In my lessons the usual story is the second one on that list: something with the connection, and the `.sb3` routine fixes it. If the game still won't save after a reload and with working internet, it's time to look at size.

## When a Scratch project is too large

There is no overall limit on file size. The limits apply to parts of the project. According to the [Project File Size page on the Scratch Wiki](https://en.scratch-wiki.info/wiki/Project_File_Size), in Scratch 3.0:

- each individual asset (costume, backdrop, sound) must be under 10 MB;
- the `project.json` file inside the `.sb3`, which holds the scripts, variables, lists and names, must be under 5 MB.

Almost all the weight comes from images and sounds; scripts take up very little. In children's projects the heaviest things are usually photos pasted in as backdrops and long sounds, especially music that plays through the whole game.

### Slimming it down inside Scratch

Tips from the [Scratch Wiki](https://en.scratch-wiki.info/wiki/Project_File_Size):

- delete sounds, costumes, backdrops and sprites you don't use;
- trim long music or replace it with a shorter loop;
- draw simple shapes in vector mode instead of bitmap (though converting an existing bitmap costume to vector doesn't make it smaller);
- shorten very long names of variables, lists and sprites, and long comments, because they bloat `project.json`.

If the project still won't save online after that, the Wiki suggests working on it in the [Scratch offline editor](https://scratch.mit.edu/download), which opens the same `.sb3`.

### Checking it in the pyScratch Inspector

Finding the one file that weighs 8 MB by hand is hard: Scratch doesn't show the size of costumes and sounds in megabytes. Next to a costume you only see its size in pixels, next to a sound its length in seconds. That's why I added an **Inspector (.sb3)** tab to my free tool [pyScratch](https://sivochka.com/pyScratch/en/). Open an `.sb3` there, and the Inspector shows:

- counters: sprites, backdrops, costumes, sounds, variables and lists (global and local), total blocks and orphan scripts with no hat block;
- the size of `project.json` as a bar against the 5 MB limit;
- a table of all costumes and sounds from heaviest to lightest, flagged "Large (>500 KB)" and "Over 10 MB!".

There are two buttons as well. "Remove Unused Assets" deletes files from the archive that the project doesn't reference. "Compress Large PNG/JPG (>960px or >500 KB)" scales large bitmap images down to 960 pixels on the longer side and recompresses them. A large PNG without transparency becomes a JPG in the process. Then save the result with "File → Save .sb3" and load it into Scratch.

pyScratch is in test mode right now, so keep the original `.sb3` separately and check the compressed project in Scratch before you carry on working with it. The file is processed in your browser and isn't uploaded anywhere. I wrote more about the tool itself in the post [about pyScratch and writing Scratch in Python](https://sivochka.com/blog/pyscratch-python-to-scratch-sb3/).

## The habit that saves the work

Saving to the Scratch server is convenient, but I don't recommend relying on it alone. When the server lets you down, the local copy is what saves you.

It helps to use "File → Save to your computer" at the end of every session, and in a big project halfway through as well. Such an `.sb3` usually doesn't weigh much, and on a bad day it keeps everything the child managed to build.

If your child does a lot in Scratch and wants to move on, from a first game to their own projects, come to [one-to-one Scratch lessons](https://sivochka.com/tutoring/scratch/). And if a game won't save right now because of its size, open it in [pyScratch](https://sivochka.com/pyScratch/en/) and look at the asset table: the heaviest file will be the first row.
