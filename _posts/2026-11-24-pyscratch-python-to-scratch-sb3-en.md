---
layout: "post"
title: "Scratch to Python Converter Online: pyScratch (Test Version)"
description: "Open an .sb3 as Python code, edit it and save it back to Scratch. A free test version of pyScratch from a tutor: what works, the limits, who it's for."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "en"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "I built pyScratch so a child can open their own Scratch game and see it as Python code. It is still a test version: here is what it can do and what it can't do yet."
category: "workshop"
categories:
  - "workshop"
tags:
  - "scratch"
  - "python"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/pyscratch-pong.webp"
image_alt: "pyScratch IDE (Ukrainian interface) with a Pong game as Python code next to the stage"
focus_keyword: "scratch to python converter online"
seo_title: "Edit SB3 in Python: Scratch to Python Converter Online"
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

There has always been a gap between Scratch and Python. My idea is an old one: a tool that moves a child from Scratch to something harder in the friendliest way possible. That tool now exists. [pyScratch](https://sivochka.com/pyScratch/en/) is a free Scratch to Python converter online that runs in the browser, and it works in both directions.

The only similar approach I have seen is Minecraft Education. That's a separate conversation.

## Scratch is not a toy

A lot of people file Scratch under toys because they met it in elementary school. I disagree. Scratch is a powerful tool, and what you can build in it still impresses me. So pyScratch doesn't say "throw away the blocks and learn something serious at last". It takes what a child has already made in Scratch and shows it in another language.

## Where kids get stuck in Python

A student who comes from Scratch already has the logic. Loops, conditions and variables make sense to them. What's hard is that the commands have different names and you have to type them. A lot of typing. In Scratch the block you need sits in the palette and you drag it in. In Python you have to remember the name, add the brackets, the colon and the right indentation.

That's the gap pyScratch is for: the child sees familiar blocks next to text and gets used to the text bit by bit.

## Edit an .sb3 in Python: what works today

The tool is fairly simple for now, but the main path already works:

1. In Scratch, save your project with "File → Save to your computer". You get an `.sb3` file.
2. In pyScratch, choose "File → Open .sb3" or just drag the file onto the page.
3. Pick a sprite or the Stage. Its scripts appear as Python-style code, and the "Scratch Blocks" tab shows the same scripts as a block tree. Clicking a block jumps to its line in the code.
4. Change the code and press the green flag (or Ctrl+Enter). The project runs on a 480×360 stage right in the page.
5. Save the result with "File → Save .sb3", then open it in Scratch with "File → Load from your computer".

It also works the other way round: write code from a blank page and pyScratch builds the Scratch blocks for you. Here is a sprite that patrols the stage and bounces off the edge (an example from the [pyScratch language reference](https://github.com/Figarist/pyScratch/blob/main/docs/DSL_REFERENCE.md)):

```python
@when_flag_clicked
def patrol():
    set_rotation_style("left-right")
    goto(0, 0)
    glide_to(0.5, "random")
    point_in_direction(90)
    for i in range(60):
        move(8)
        if_on_edge_bounce()
        wait(0.03)
```

Each function here is one Scratch block. The `@when_flag_clicked` decorator becomes the "when green flag clicked" hat block, and `for i in range(60):` repeats the loop body 60 times. A child who has built this out of blocks will recognise every line.

Everything runs in the browser. Your `.sb3` file is not uploaded to a server, and you don't need an account. If you don't have a project at hand, there are nine ready-made templates, including Pong, a maze and a clicker game. pyScratch is open source: the [GitHub repository](https://github.com/Figarist/pyScratch) is under the MIT license.

## In lessons, an illustration for now

So far I bring pyScratch in visually. I show a child their own script as blocks and, next to it, the same script as text. Kids like it.

I don't have concrete stories yet. The tool is brand new.

## Limits of the test version

pyScratch is in test mode, and it doesn't match Scratch one to one yet. Here is what to know up front (the full list is in the [guide below the editor](https://sivochka.com/pyScratch/en/#guide)):

- It is not full Python. `import`, `class`, `return`, `break`, `continue`, `lambda`, `try`/`except`, f-strings and a few other constructs are not supported, and the compiler tells you so. This code will not run in a regular Python interpreter.
- Scripts with blocks the converter doesn't know yet (Video Sensing or Makey Makey, for example) stay in the project and are saved unchanged, but the editor shows only a comment for them. You can't edit them as code.
- Comments attached to blocks that pyScratch regenerates are lost when you save.
- The stage in pyScratch is a simplified simulator, so some things (touching checks, for example) can behave a little differently from Scratch. The fisheye and whirl effects are not drawn. Check the final result in Scratch.
- Only Scratch 3.0 files (`.sb3`) are supported. Open an old `.sb2` in Scratch 3.0 first and save it again.
- Compiler error messages and the comments the converter adds to the code are in Ukrainian only for now.

## Who it's for

Kids aged 9 and up, and they come in two kinds. Some are curious geeks who want to write their Scratch game in Python just because they can. Others have outgrown Scratch and need a step towards something harder.

If you're not sure your child is ready for text code, start with [Scratch vs Python for kids: how to tell when your child is ready to switch](https://sivochka.com/blog/scratch-vs-python-for-kids/).

## Try it on your own game

Take one of your own Scratch games, save it as `.sb3`, open it in [pyScratch](https://sivochka.com/pyScratch/en/) and see how it looks in Python. Change one number in a loop, run it, save it back and open it in Scratch.

If after that you want to write real Python, from a blank file and without blocks as hints, that's exactly what we do in [one-to-one Python lessons](https://sivochka.com/tutoring/python/).
