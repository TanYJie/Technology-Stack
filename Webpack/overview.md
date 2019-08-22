# Webpack 基础总结
* [术语表定义](#webpack-术语表定义)

## webpack 术语表定义
* module: 离散的功能块，提供比完整程序更小的体积。可以是 ESM 模块，也可以是 commonJS 或者 AMD 模块

* chunk: 打包过程中被操作的模块文件

* bundle: 最后打包后的文件，已经过加载和编译过程的源文件的最终版本。bundle 可以和 chunk 长的一模一样，但是大部分情况下他是多个 chunk 的集合
