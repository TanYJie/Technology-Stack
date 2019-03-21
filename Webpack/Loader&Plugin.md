# Loader
　　loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

　　本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。
## Loader 特性
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
* 插件（plugin）可以为 loader 带来更多特性。

## 常见 Loader
* vue-loader：加载和转译 Vue 组件
* babel-loader：加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
* ts-loader：像 JavaScript 一样加载 TypeScript 2.0+
* file-loader 将文件发送到输出文件夹，并返回（相对）URL
* url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL

<br>

# Plugin
　　插件目的在于解决 loader 无法实现的其他事。由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。
## 常见 Plugin
* HtmlWebpackPlugin：为你生成一个 HTML5 文件
* ExtractTextWebpackPlugin：更快加载 `.css`文件
