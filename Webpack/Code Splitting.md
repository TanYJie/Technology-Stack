# 参考文献
> * [使用代码拆分减少 JavaScript 负载](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/#top_of_page)
> * [Webpack 基础总结](https://zhuanlan.zhihu.com/p/57722935?utm_source=qq&utm_medium=social&utm_oi=910792540654022656)

# 初步了解代码拆分
* 现代网站通常将所有 JavaScript 组合成一个大型捆绑包。以这种方式交付 JavaScript 时，加载性能会受到影响。大量的 JavaScript 也会占用主线程，延迟可交互时间。这对于具有较少内存和处理能力的设备尤其如此。

* 代码分割是一种大型捆绑包的替代方法，即将 JavaScript 拆分为较小的代码块。这样可以提前发送首要必需的少量代码，从而缩短页面加载时间。其余的可以按需加载。

* 代码拆分可以通过以下方式完成：
  * **Vendor 拆分**将公共代码（例如 React，lodash 等）从程序代码中分离出来。这允许您将应用程序和公共代码分开。这种隔离可以降低公共代码或应用程序代码更改时使用户的缓存失效的负面性能影响。这应该在每个应用程序中都实现。
  
  * **入口拆分**通过将您的代码按应用程序中的入口进行分隔，这些脚本是 webpack 和 Parcel 等工具在构建应用程序的依赖关系树时启动的脚本。这最适用于未使用客户端路由的页面或应用程序，或者某些部分使用服务器端路由而其他部分属于单页面应用程序的混合应用程序。
  
  * **动态拆分**将使用动态 `import()` 语句进行代码拆分。这种类型的拆分通常最适合单页面应用程序。
  
