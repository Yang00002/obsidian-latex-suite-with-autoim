# Obsidian Latex Suite with AutoIM <img src="https://img.shields.io/github/manifest-json/v/Yang00002/obsidian-latex-suite-with-autoim">

**[中文文档](./README_cn.md)**

**This plugin is a fork of [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/).**

**This plugin only support Windows x86_64.**
## Usage

This plugin is the same as [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/), except a new function autoIM.

AutoIM allow you to change your InputMethod languague when you come in or out the math environment. Commonly, you should type an extra `Shift` to achieve it.

This is not for those whose first language is English.

## Install

For personally reason, this plugin would never be submitted to the  community.

If you want to use it, there are two choices:

- compile from source code, see [Build a plugin](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin) for detail. Still need `im.exe` from release.

- download [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) and replace its file.

### download [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) and replace its file

You can download [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) from community 

`Obsidian > Settings > Community plugins > Browser`

Once you downloaded it, you can see four files at latex-suite file

`<vault directory>\.obsidian\plugins\obsidian-latex-suite`

Then you can get release zip from this repository. It contain `main.js` and `im.exe`. 

- For `main.js`, Replace `main.js` in latex-suite file with this version.

- For `im.exe`, put it at wherever you want, but remember its path.

Now you can enter you obsidian, before use autoIM, you need to edit the settings of Latex-Suite, setting the Auto IM Path to the path of `im.exe` and reenable Auto IM.

You can find settings in 

`Obsidian > Settings > Latex Suite > Auto IM Settings`

You need to replace `main.js` and set path in every valuts you wanted to use autoIM. But they can share `im.exe`.

## Advanced Topics

### Why I implement autoIM in Latex-Suite instead of making a new plugin

I have no better idea about how to find the math environment efficienty.

I was trying to use the strategy of Latex-Suite but it act strange in my plugin. In fact I am not familiar with typescript, not to say codemirror.

The need of autoIM only come from editing math equation. Integrate the function to Latex-Suite is convinient and simple, especially when Latex-Suite greately accelerated math writing.

### How to switch IM in an Obsidian Plugin

Obsidian Plugins are writing in typescript. Typescript cannot change IM itself. It depends on Windows api in C.

There are several ways to using Windows api in Typescript:

- package `ffi-napi`, I never success on installing it.

- `WASI` in `WASM`, don't work for unkown reason.

- pacakge `koffi`, it can call functions in dll in javascript. 

- nodejs `n-api`, it can also call functions in dll in javascript, faster than `koffi` but need more C skills.

The above two strategies work in nodejs. Saddly, not in Obsidian Plugin. I have no way handling `.node` addon by ESBuild.

- run `exe`, in this case is the `im.exe`

This is the slowest method, but it work. See [autoIM Extension File](./src/editor_extensions/autoim.ts) for detail.

### Change the default language in text environment

In default, the language in text environment is Chinese. If you want to use another language, you just need to change `im.exe`.

AutoIM run command `im.exe` when coming into text environment, and `im.exe 1` when coming into math environment. You can make a new `im.exe` and tell autoIM its path by settings.

## Acknowledgement

Thank for [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) for its environment and method of detecting mouse moving.

Thank for [Auto Shift Input](https://github.com/3biubiu/auto-shift-input) for its method of switching the InputMethod.

Thank for [Vim IM Switch](https://github.com/yuanotes/obsidian-vim-im-switch-plugin) for its method of running C program in Obsidian plungins.
