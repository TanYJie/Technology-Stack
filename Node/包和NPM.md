# 包结构
　　包实际上是一个存档文件，符合 CommonJS 规范的包目录应该包含如下文件：
  * `package.json`: 包描述文件
  * `bin`: 存放可执行二进制文件的目录
  * `lib`: 存放 JavaScript 代码的目录
  * `doc`: 存放文档的目录
  * `test`: 存放单元测试用例的代码
    
<br>
  
# 包描述文件
　　包描述文件用于表达非代码相关的信息，它是一个 JSON 格式的文件：`package.json`，位于包的根目录下，是包的重要组成部分。
  
　　CommonJS 为 `package.json` 文件定义了规范，NPM 实际需要的字段有：
  * `name`：包名，包名必须是唯一的，避免对外公布时产生重名冲突
  * `description`：包简介
  * `version`：版本号
  * `keywords`：关键词数组
  * `repositories`：托管源代码的位置列表
  * `author`：包作者
  * `bin`：一些包作者希望包可以作为命令行工具使用。配置好 bin 字段后，通过 `npm install package_name -g` 命令可以将脚本添加到执行路径中，之后可以在命令行中直接执行
  * `main`：模块引入方法 `require()` 在引入包时，会优先检查这个字段，并将其作为包中其余模块的入口。若不存在，则查找 `index.js`、`index.node`、`index.json` 文件作为默认入口。
  * `scripts`：脚本说明对象，提供钩子机制。它主要被包管理器用来安装、编译、测试、卸载包。实例如下：
  ```json
  "scripts":{
    "install": "install.js",
    "unstall": "unstall.js",
    "build": "build.js",
    "doc": "doc.js",
    "test": "test.js",
  }
  ```
  * `engines`：支持的 JavaScript 引擎列表
  * `dependencies`：使用当前包所需要依赖的包列表，**NPM 会通过这个属性帮助自动加载依赖的包**
  * `devDependencies`：**只在开发时需要**的依赖包
  
<br>

# NPM 常用功能

* `npm -v`
：**查看版本**

* `npm init`
：**初始化包描述文件。** NPM 通过提问式的交互逐个填入选项，生成包描述文件

* `npm adduser`
：**注册包仓库账号**

* `npm publish <folder>`
：**上传包**。在 `package.json`文件所在目录下，执行 `npm publish .`

* `npm install`
：**安装包**

* `npm ls`
：**分析包**。分析出当前路径下能够通过模块路径找到的所有包，并生成依赖树
