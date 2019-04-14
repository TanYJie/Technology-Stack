# CSS 性能调优

本章内容：
* [提升 CSS 选择器性能](#提升-css-选择器性能)
* [开启 GPU 加速](#合成层和-gpu-加速)
* [使用 requestAnimationFrame 代替 `setTimeout()`/`setInterval()` 操作](#requestanimationframe)

<br>

## 提升 CSS 选择器性能
　　CSS 选择器对性能的影响源于 **浏览器匹配选择器和文档元素时所消耗的时间**，所以优化选择器的原则是应尽量避免使用消耗更多匹配时间的选择器。**注意：CSS 选择器是从右到左进行规则匹配。**
  * 避免使用通用选择器
  * 避免使用标签或 class 选择器限制 id 选择器
  * 避免使用标签限制 class 选择器
  * 避免使用多层标签选择器。使用 class 选择器替换，减少 CSS 查找
  

<br>

## 合成层和 GPU 加速
　　==> [推荐文章](http://taobaofed.org/blog/2016/04/25/performance-composite/)
  
　　一个 Web 页面的展示，简单来说可以认为经历了以下几个步骤。

  * JavaScript：我们会使用 JavaScript 来实现一些视觉变化的效果。比如做一个动画或者往页面里添加一些 DOM 元素等。
  * Style：计算样式，这个过程是根据 CSS 选择器，对每个 DOM 元素匹配对应的 CSS 样式。
  * Layout：布局
  * Paint：绘制，本质上就是填充像素的过程。一般来说，这个绘制过程是在多个层上完成的。
  * Composite：渲染层合并，由上一步可知，对页面中 DOM 元素的绘制是在多个层上进行的。在每个层上完成绘制过程之后，浏览器会将所有层按照合理的顺序合并成一个图层，然后显示在屏幕上。对于有位置重叠的元素的页面，这个过程尤其重要，因为一旦图层的合并顺序出错，将会导致元素显示异常。
 
### 从 Nodes 到 LayoutObjects
　　DOM 树中的每个 Node 节点都有一个对应的 LayoutObject 。LayoutObject 知道如何在屏幕上 paint Node 的内容。

### 从 LayoutObjects 到 PaintLayers
　　一般来说，拥有相同的坐标空间的 LayoutObjects，属于同一个渲染层（PaintLayer）。PaintLayer 最初是用来实现 stacking contest（层叠上下文），以此来保证页面元素以正确的顺序合成，这样才能正确的展示元素的重叠以及半透明元素等等。

### 从 PaintLayers 到 GraphicsLayers
　　某些特殊的渲染层会被认为是合成层（Compositing Layers），合成层拥有单独的 GraphicsLayer，而其他不是合成层的渲染层，则和其第一个拥有 GraphicsLayer 父层公用一个。

　　每个 GraphicsLayer 都有一个 GraphicsContext，GraphicsContext 会负责输出该层的位图，位图是存储在共享内存中，作为纹理上传到 GPU 中，最后由 GPU 将多个位图进行合成，然后 draw 到屏幕上，此时，我们的页面也就展现到了屏幕上。 

　　渲染层提升为合成层的原因有以下几种：
  * 直接原因
    * 硬件加速的 iframe 元素（比如 iframe 嵌入的页面中有合成层）
    * video 元素
    * 覆盖在 video 元素上的视频控制栏
    * 3D 或者 硬件加速的 2D Canvas 元素
    * 硬件加速的插件，比如 flash 等等
    * 有 3D transform
    * 对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition（需要是 active 的 animation 或者 transition，当 animation 或者 transition 效果未开始或结束后，提升合成层也会失效）
    * will-change 设置为 opacity、transform、top、left、bottom、right（其中 top、left 等需要设置明确的定位属性，如 relative 等）
  * 后代元素原因
    * 有合成层后代同时本身有 transform、opactiy（小于 1）、mask、fliter、reflection 属性
    * 有合成层后代同时本身 overflow 不为 visible（如果本身是因为明确的定位因素产生的 SelfPaintingLayer，则需要 z-index 不为 auto）
    * 有合成层后代同时本身 fixed 定位
    * 有 3D transfrom 的合成层后代同时本身有 preserves-3d 属性
    * 有 3D transfrom 的合成层后代同时本身有 perspective 属性
 
### 性能优化
　　提升为合成层简单说来有以下几点好处：
  * 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
  * 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
  * 对于 transform 和 opacity 效果，不会触发 layout 和 paint
  
　　利用合成层对于提升页面性能方面有很大的作用，因此我们也总结了一下几点优化建议。
  * 提升动画效果的元素：提升合成层的最好方式是使用 CSS 的 will-change 属性。（记得变化完成后移除 will-change）
  * 使用 transform 或者 opacity 来实现动画效果
  * 防止层爆炸：不要创建太多的渲染层。因为每创建一个新的渲染层，就意味着新的内存分配和更复杂的层的管理。

<br>

## requestAnimationFrame
　　HTML5 提供一个专门用于请求动画的 API，那就是 requestAnimationFrame。在 CSS 变换和动画中，浏览器知道动画什么时候开始，因此会计算出正确的循环间隔，在恰当的时候刷新 UI。而 JavaScript 动画只是简单的用`setTimeout()`/`setInterval()`，这并不是十分精确（仅把动画代码插入到队列中，不代表立即执行）。
  
　　因此创造了一个新的方法`requestAnimationFrame()`,其最大的优势是由系统来决定回调函数的执行时机。`requestAnimationFrame()`方法接受一个参数，**即在每次重绘屏幕前调用的一个函数**。
  
　　`requestAnimationFrame()`还有以下两个优势：

  * CPU 节能：使用`setTimeout()`/`setInterval()`实现的动画，当页面被隐藏或最小化时，仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而`requestAnimationFrame()`则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的`requestAnimationFrame()`也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。
  * 函数节流：因为显示器每16.7ms刷新一次，所以`requestAnimationFrame()`自动提供了函数节流的效果。
