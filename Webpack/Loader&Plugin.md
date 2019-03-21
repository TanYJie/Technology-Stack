# Loader
　　loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。
## 常见 Loader
* vue-loader：解析和转换`.vue`文件，提取出其中的逻辑代码`<script>`、样式代码`<style>`、以及 HTML 模版`<template>`，再分别把它们交给对应的 Loader 去处理
* babel-loader：将后代 JavaScript 代码编译为 浏览器兼容的 JavaScript 代码
* url-loader

<br>

# Plugin
## 常见 Plugin
* HtmlWebpackPlugin：为你生成一个 HTML5 文件
* ExtractTextWebpackPlugin：更快加载 `.css`文件
