# Obsidian Latex Suite with AutoIM <img src="https://img.shields.io/github/manifest-json/v/Yang00002/obsidian-latex-suite-with-autoim">

**[English File](./README.md)**

**本插件是 [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) 的一个 fork.**

**本插件只支持 Windows x86_64.**
## 用途

本插件功能与 [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) 相同, 除了 autoIM 功能.

AutoIM 允许你在数学环境下自动切换到英文输入法, 在其他环境自动切换到中文输入法. 正常情况下, 你需要多按一个 `Shift` 来达到这个效果.

## 安装

因为个人原因, 本插件永远不会在社区插件市场上架.

如果你要用这个插件, 有两种方案:

- 从源码编译, 方法见 [Obsidian Developer Decument](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin). 需要从 release 下载 `im.exe`


- 下载插件 [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) 并替换它的文件.

### 下载 [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) 并替换它的文件

你可以从社区插件市场下载 [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/).

`Obsidian > 设置 > 第三方插件 > 社区插件市场`

下载之后, 在 latex-suite 的目录下可以看到 4 个文件

`<仓库目录>\.obsidian\plugins\obsidian-latex-suite`

然后从该仓库下载 `release` 的 `zip` 文件(不是源码). 它应该包含 `main.js` 和 `im.exe`. 

- 对于 `main.js`, 把 latex-suite 目录下的 `main.js` 替换成这个版本.

- 对于 `im.exe`, 随便放到一个地方, 把它的路径记下来.

现在可以进入 obsidian, 然后需要更改一下 autoIM 的设置, 你需要首先进入 latex-suite 的设置, 拉到最下面. 然后把 `Path` 设置为刚才的 `im.exe` 路径, 重新点一下 `enable`, 把 autoIM 关掉再打开.

设置在

`Obsidian > 设置 > Latex Suite > Auto IM Settings`

每创建一个仓库, 都要替换一次 `main.js`, 也要设置一次路径. 但是不同仓库的 `im.exe` 可以共享.

## 其他话题

### 为什么在 latex-suite 实现 autoIM 而不是单独写一个插件

我找不到在 Obsidian 中更好的检测数学环境的高效方法了.

我之前试过按 latex-suite 的方法检测数学环境, 但在自己的插件中就是不好使. 而且我是个 typescript 新手, 对 typescript 和 codemirror 都不熟悉, 写这个插件仅仅是因为 Obsidian 没有.

因为 autoIM 只在写数学公式时需要用到, 把它集成在 latex-suite 中是方便和自然的, 如果你想用 autoIM 但不想用 latex-suite, 那我推荐你使用 latex-suite(实在不想用可以自己写一个).

### 在 Obsidian 插件中怎么切换输入法

Obsidian 插件是拿 typescript 写的. Typescript 不能自己替换输入法, 必须用 C 调用 Windows api.

有下面在 Typescript几种使用 Windows api 的方法

-  `ffi-napi` 包, 我配了一天都没配成功, 魔法都不好使

- `WASM` 中的 `WASI`, 不知道为什么有问题

- `koffi` 包, `ffi-napi` 更好下载, 更快的版本,  可以让你在 `js` 中调用 dll

- nodejs 原生的 `n-api`, 也可以让你在 `js` 中调用 dll, 比 `koffi` 更快

上面两个在 `typescript` 用 node 运行都能使, 但是 Obsidian 插件用 ESBuild 打包, 不知道用什么方式运行, 反正是不能处理生成的 `.node` 文件.

- 直接运行 `exe`, 就是这个插件中的 `im.exe`

这是最慢的, 也是唯一跑通的. 代码见 [autoIM Extension File](https://github.com/Yang00002/obsidian-latex-suite-with-autoim/blob/main/src/editor_extensions/autoim.ts).

### autoIM 的 exe 接口

autoIM 切换输入法是通过运行 `im.exe`. 当进入公式环境, 运行 `im.exe 1`, 当进入文本环境, 运行 `im.exe`. 所以如果想在别的平台使用这个插件, 可以自己打包一个 `im.exe`, 完成切换输入法的功能.

## 致谢

感谢 [Obsidian Latex Suite](https://github.com/artisticat1/obsidian-latex-suite/) 提供的环境和检测鼠标移动的方法.

感谢 [Auto Shift Input](https://github.com/3biubiu/auto-shift-input) 提供的切换中英文输入法的方法.

感谢 [Vim IM Switch](https://github.com/yuanotes/obsidian-vim-im-switch-plugin) 提供的在 Obsidian 插件运行 C 程序的方法.