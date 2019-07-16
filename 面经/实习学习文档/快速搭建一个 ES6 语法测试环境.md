# 快速搭建一个 ES6 语法测试环境

> 前置环境：node



1、新建项目，执行`npm init`

2、安装 babel-cli 和 babel-preset-es2015  工作目录下执行安装命令 

````
npm --save-dev install babel-cli 
npm install --save-dev babel-preset-es2015
````

3、工作目录下新建.babelrc文件，内容如下：  

```
{
	"presets": [ "es2015" ], 
	"plugins": [] 
}
```

4、测试 ES6 代码 
工作目录下新建 test.js 文件，简单输入一段 ES6 代码：

```
let [a,b,c] = [1,2,3];
console.log(a,b,c);
```

使用 babel-node 命令执行 test.js 文件，在命令行输入：

```
$ babel-node test
```

