# 为什么使用虚拟 DOM ?        
　　Web 界面由 DOM 树来构建，虚拟 DOM 就是为了解决 **浏览器性能** 问题而被设计出来的。如前，若一次操作中有 10 次更新 DOM 的动作，虚拟 DOM 不会立即操作 DOM，而是将这 10 次更新的内容保存到本地一个 JavaScript 对象`vnode`中，最终将`vnode`与旧的虚拟 DOM 对象`oldVnode`进行对比，形成一个补丁`patch`，然后将`patch`打到浏览器的 DOM 上，形成最终的更新。
  
　　所以，用 JavaScript 对象模拟 DOM 节点的好处是，更新可以先全部反映在 JavaScript 对象上，操作内存中的 JavaScript 对象的速度显然要更快，等更新完成后，再将最终的 JavaScript 对象映射成真实的 DOM，交由浏览器去绘制。
  
<br>

# 如何得到 patch ?
　　两棵树如果完全比较时间复杂度是 O(n^3)，但 Vue 的 diff 算法的时间复杂度是 O(n)。要实现这么低的时间复杂度，意味着只能平层的比较两棵树的节点，放弃了深度遍历。这样做，似乎牺牲掉了一定的精确性来换取速度，但考虑到现实中前端页面通常也不会跨层移动 DOM 元素，这样做是最优的。

　　以下为 vue 源码的逻辑，建议移步至 [源码](https://github.com/TanYJie/Technology-Stack/blob/master/Vue/vdom源码.md)
  
<br>

# patch 逻辑
1. 如果 vnode 不存在但是 oldVnode 存在，说明要销毁老节点，那么就调用 `invokeDestroyHook(oldVnode)` 来进行销毁
2. 如果 oldVnode 不存在但是 vnode 存在，说明要创建新节点，那么就调用 `createElm` 来创建新节点
3. 当 vnode 和 oldVnode 都存在时
   * oldVnode 和 vnode 是同一个节点，就调用 patchVnode 来进行 patch
   * 当 vnode 和 oldVnode 不是同一个节点时，如果 oldVnode 是真实 dom 节点或 hydrating 设置为 true，需要用 hydrate 函数将虚拟 dom 和真实 dom 进行映射，然后将 oldVnode 设置为对应的虚拟 dom，找到 oldVnode.elm 的父节点，根据 vnode 创建一个真实 dom 节点并插入到该父节点中 oldVnode.elm 的位置
     
<br>

# patchVnode 逻辑
1. 如果 oldVnode 跟 vnode 完全一致，那么不需要做任何事情
2. 如果 oldVnode 跟 vnode 都是静态节点，且具有相同的 key，当 vnode 是克隆节点或是 v-once 指令控制的节点时，只需要把 oldVnode.elm 和  oldVnode.child 都复制到 vnode 上，也不用再有其他操作
3. 否则，如果 vnode 不是文本节点或注释节点
    * 如果 oldVnode 和 vnode 都有子节点，且双方的子节点不完全一致，就执行 `updateChildren`
    * 如果只有 oldVnode 有子节点，那就把这些节点都删除
    * 如果只有 vnode 有子节点，那就创建这些子节点
    * 如果 oldVnode 和 vnode 都没有子节点，但是 oldVnode 是文本节点或注释节点，就把 vnode.elm 的文本设置为空字符串
4. 如果 vnode 是文本节点或注释节点，只需要更新 vnode.elm 的文本内容就可以
    
# updateChildren 逻辑
```javascript
function updateChildren(){
    while(..){
        if(旧头比新头){
            // 操作index
        }
        if(旧尾比新尾){
            // 操作index
        }
        if(旧头比新尾){
            patchVnode();
            // 把旧头移动到旧尾之后
        }
        if(新头比旧尾){
            patchVnode();
            // 把旧尾移动到旧头之前
        }
        else{
            // 尝试在oldChildren中寻找跟newStartVnode具有相同key的节点
            if(没找到){
                // 创建新节点 
            }
            else{
                // 找到了，在用sameVnode()函数判断是否是同一节点
                if(是同一节点){
                    patchVnode();
                    // 标记为已处理
                    // 插入到旧头之前
                }
                else{
                    // 不是同一节点
                    // 当做新节点处理
                    // 创建新节点
                }
            }
        }
    }
    // 循环结束
    // 如果 oldStart 和 oldEnd 相遇，说明在 newStartIdx 和 newEndIdx 之间的节点都是新节点，直接添加
    if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } 
    // 如果 newStart 和 newEnd 相遇，说明在 oldStartIdx 和 oldEndIdx 之间的节点在新 dom 中不存在，直接删除
    else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```
