# HTML5 新特性


## 1、简化的 DOCTYPE 声明
HTML4.01 标准版本的 DOCTYPE 的声明
```xml
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://ww.w3.org/TR/html4/strict.dtd"> 
```
HTML4.01 过渡版本的 DOCTYPE 的声明
```xml
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://ww.w3.org/TR/html4/loose.dtd"> 
```
HTML4.01 基于框架的 HTML 文档版本的 DOCTYPE 的声明
```xml
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://ww.w3.org/TR/html4/frameset.dtd"> 
```
HTML5 中的 DOCTYPE 声明（对字母大小写不敏感）
```xml
<!DOCTYPE HTML>
```

<br>

## 2、简化的编码字符集
对于 HTML4.01 标准编码字符集声明
```html
<meta http="Content-Type" content="text/html;charset=utf-8">
```
HTML5 的编码字符集声明
```xml
<meta charset="utf-8">
```

<br>

## 3、简化的样式表和脚本引入
HTML4.01 标准的 html 文档中引入的样式表和脚本文本
```html
<link href="test.css" type="text/css" rel="stylesheet"> 
<script src="test.js" type="text/javascript"></script>
```
HTML5 中标准的 html 文档引入的样式文本和脚本文本
```html
<link href="test.css" rel="stylesheet">
<script src="test.js"></script>
```

<br>

## 4、新增的语义/结构化标签
参考 [W3C](http://www.w3school.com.cn/tags/index.asp)

<br>

## 5、新的图形标签
`<svg>` 与 `<canvas>`

SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。其他图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

| SVG | Canvas |
| --- | --- |
| 矢量图，放大不失真，与分辨率无关 | 基于像素，与分辨率有关 | 
| 内部元素支持事件处理程序 | 内部“元素”不支持事件处理程序 |

<br>

## 6、新的 API
* HTML Geolocation 地理位置
* HTML Drag & Drop 拖放
* HTML Local Storage 本地存储
* HTML Application Cache 应用程序缓存
* HTML Web Workers web 工作者
* HTNL SSE
