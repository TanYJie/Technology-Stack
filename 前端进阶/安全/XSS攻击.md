# XSS 攻击

　　（文章转自[此处](https://www.freebuf.com/articles/web/185654.html)）
  
　　Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。

　　XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

　　XSS 有以下三类：
  * 反射型 XSS
  * 持久型 XSS
  * DOM 型 XSS
  
  <br>
  
### 反射型 XSS
　　反射型 XSS 步骤如下：  
1. 攻击者构造出特殊的 URL，其中包含恶意代码。  
2. 用户打开带有恶意代码的 URL 时，**后端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器**。  
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。

### 存储型 XSS
　　存储型 XSS 步骤如下：  
1. 攻击者将恶意代码提交到目标网站的数据库中。
2. 用户打开目标网站时，**后端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器**。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。

### DOM 型 XSS
1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL。
3. 用户浏览器接收到响应后解析执行，**前端 JavaScript 取出 URL 中的恶意代码并执行**。

　　DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

　　在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等。

　　如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。

　　DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>`标签的 href 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能 **把字符串作为代码运行**。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。
  
  
<br>

## 防御方案
#### 方案一
　　使用`escapeHTML()`将 url 进行转义，可过滤掉`<script>`标签。

　　`escapeHTML()` 按照如下规则进行转义： 

|字符|转义后的字符| 
|-|-| 
|&|\&amp;| 
|<|\&lt;| 
|>|\&gt;| 
|"|\&quot;| 
|'|\&#x27;| 
|/|\&#x2F;|

#### 方案二  
　　方案一解决了`<script>`标签的问题，但`javascript:`这样的字符串如果出现在特定的位置也会引发 XSS 攻击。比如：
 * 正常版：`http://xxx/?redirect_to=javascript:alert('XSS')`
 * 大小写版：`http://xxx/?redirect_to=jAvascRipt:alert('XSS')`
 * 开头带空格版：`http://xxx/?redirect_to=%20javascript:alert('XSS')`
　　因此对于链接跳转，如 `<a href="xxx">` 或 `location.href="xxx"`，要检验其内容，禁止以 `javascript:` 开头的链接，和其他非法的 scheme。
  
<br>

## 总结
XSS 注入的方法：
  * 在 HTML 中内嵌的文本中，恶意内容以 `<script>` 标签形成注入。
  * 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
  * 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
  * 在标签的 href、src 等属性中，包含 `javascript:` 等可执行代码。
  * 在 onload、onerror、onclick 等事件中，注入不受控制代码。

防御 XSS 攻击，要做正确的转义，同时要注意：
  * HTML 转义是非常复杂的，在不同的情况下要采用不同的转义规则。如果采用了错误的转义规则，很可能会埋下 XSS 隐患。
  * 尽量避免自己写转义库，而应当采用成熟的、业界通用的转义库。
  * 对于 DOM 型 XSS ，要注意不要将字符串执行为函数，执行前要做类型的判断。

