#!/usr/bin/env node
/**
 * check-seo.js
 * Front Matter CMS Custom Action
 *
 * Validates SEO metadata in the front matter of the current file.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

var rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.error('No arguments provided by Front Matter CMS.');
  process.exit(1);
}

// Find the file path
var filePath = null;
for (var i = 0; i < rawArgs.length; i++) {
  var arg = rawArgs[i];
  if (arg.trim().startsWith('{') && arg.trim().endsWith('}')) {
    try {
      var parsed = JSON.parse(arg);
      if (parsed.path || parsed.filePath) {
        filePath = parsed.path || parsed.filePath;
      }
    } catch (_) {}
  }
}

if (!filePath) {
  for (var j = 0; j < rawArgs.length; j++) {
    var possiblePath = rawArgs[j];
    if (possiblePath.toLowerCase().endsWith('.md') && fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break;
    }
  }
}

if (!filePath || !fs.existsSync(filePath)) {
  console.error('Could not resolve a valid file path from arguments.');
  process.exit(1);
}

filePath = path.resolve(filePath);

var content;
try {
  content = fs.readFileSync(filePath, 'utf-8');
} catch (e) {
  console.error('Cannot read file: ' + e.message);
  process.exit(1);
}

var fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('No front matter found in file.');
  process.exit(1);
}

var fmBlock = fmMatch[1];

function getFmValue(block, key) {
  var lines = block.split(/\r?\n/);
  var prefix = key + ':';
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.substring(0, prefix.length) === prefix) {
      var val = line.substring(prefix.length).trim();
      val = val.replace(/^["']|["']$/g, '').trim();
      return val.length > 0 ? val : null;
    }
  }
  return null;
}

var title = getFmValue(fmBlock, 'title') || '';
var description = getFmValue(fmBlock, 'description') || '';
var focus_keyword = getFmValue(fmBlock, 'focus_keyword') || '';
var image = getFmValue(fmBlock, 'image') || '';
var image_alt = getFmValue(fmBlock, 'image_alt') || '';

var warnings = [];
var successes = [];

// Title check
if (!title) {
  warnings.push('Title is missing.');
} else if (title.length > 60) {
  warnings.push('Title is too long (' + title.length + ' chars). Keep under 60 chars.');
} else {
  successes.push('Title length is optimal.');
}

// Description check
if (!description) {
  warnings.push('Description is missing.');
} else if (description.length < 120) {
  warnings.push('Description is too short (' + description.length + ' chars). Aim for ~150-160.');
} else if (description.length > 160) {
  warnings.push('Description is too long (' + description.length + ' chars). Keep under 160.');
} else {
  successes.push('Description length is optimal.');
}

// Focus keyword check
if (focus_keyword) {
  var kwLower = focus_keyword.toLowerCase();
  
  if (title.toLowerCase().indexOf(kwLower) === -1) {
    warnings.push('Focus keyword ("' + focus_keyword + '") not found in title.');
  } else {
    successes.push('Keyword in title.');
  }
  
  if (description.toLowerCase().indexOf(kwLower) === -1) {
    warnings.push('Focus keyword ("' + focus_keyword + '") not found in description.');
  } else {
    successes.push('Keyword in description.');
  }
} else {
  warnings.push('No focus_keyword defined.');
}

// Image check
if (!image) {
  warnings.push('Cover image is missing.');
}
if (!image_alt) {
  warnings.push('Cover image alt text is missing.');
} else {
  successes.push('Cover image has alt text.');
}

var output = '';
if (warnings.length > 0) {
  output += '⚠️ WARNINGS:\n- ' + warnings.join('\n- ') + '\n\n';
} else {
  output += '✅ PERFECT! Zero warnings.\n\n';
}

if (successes.length > 0) {
  output += '✅ SUCCESSES:\n- ' + successes.join('\n- ');
}

console.log(output);
