# CSS 选择器

[==> W3C 官方链接](http://www.w3school.com.cn/cssref/css_selectors.asp)

# 选择器优先级

[==> 推荐博客](http://www.cnblogs.com/wangmeijian/p/4207433.html)

首先来看一下 css 选择器有哪些?
1. ID选择器(如：id="name",id="name_txt")
2. 类选择器
    - 普通类选择器（ .head ）
    - 结合元素选择器（ p.important // h1.important ）
    - 多类选择器（同时包含 class="important warning" // .important.warning）
3. 标签选择器(如：body,div,p,ul,li)
4. 全局选择器(如：\*号)
5. 相邻兄弟选择器 (如：h1+p,带加号+)
6. 子选择器 (如：div>p ,带大于号>)

7. 后代选择器 (如：#head .nav ul li 从父集到子孙集的选择器)
8. 组合选择器(如：.head .head_logo，注意两选择器用空格键分开)
9. 群组选择器 div,span,img {color:Red} 即具有相同样式的标签分组显示
10. 继承选择器(如：div p,注意两选择器用空格键分开)
11. 伪类选择器(如：就是链接样式,a元素的伪类，4种不同的状态：link、visited、active、hover。)
12. 字符串匹配的属性选择符(^ $ \*三种，分别对应开始、结尾、包含)


<br>

**选择器优先级：**
1. 在属性后面使用 !important 
2. 作为 style 属性写在元素内的样式

1. id 选择器（#myid）
2. 类选择器（.myclassname）
3. 标签选择器（div,h1,p）
4. 相邻选择器（h1+p）
5. 子选择器（ul > li）
6. 后代选择器（li a）
7. 通配符选择器（\*） 
8. 属性选择器（[rel="external"]）
9. 伪类选择器（a:hover,li:nth-child）

**如果优先级相同，后写的样式会覆盖先写的样式。**
