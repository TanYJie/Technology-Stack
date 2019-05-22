/**
 * @author       TanYJie
 * @description  有关二叉树的算法
 */


/**
 * @description   二叉树类
 * @param  value  节点的值
 */
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} 


/**
 * @description   先序遍历二叉树
 * @param  root   树的根节点
 */
var preorderTraversal = function(root) {
    if(root == null){
        return [];
    }
    var stack = [];
    var res = [];
    stack.push(root);
    while(stack.length>0){
        var node = stack.pop();
        res.push(node.val);
        if(node.right)
            stack.push(node.right);
        if(node.left)
            stack.push(node.left);
    }
    return res;
};


/**
 * @description   中序遍历二叉树
 * @param  root   树的根节点
 */
var inorderTraversal = function(root) {
    if(root == null){
        return [];
    }
	
    var p = root;
    var res = [];
    var stack = [];
    
    while(p!=null||stack.length>0){
        if(p!=null){
            stack.push(p);
            p = p.left;
        }
        else{
            p = stack.pop();
            res.push(p.val);
            p = p.right;
        }
    }
    return res;
};


/**
 * @description   后序遍历二叉树
 * @param  root   树的根节点
 */
var postorderTraversal = function(root) {
    if(root == null){
        return [];
    }
	
    var p = root;
    var arr = [];
    var stack = [];
    stack.push(root);
    while(stack.length>0){
        var node = stack.pop();
        arr.unshift(node.val);
        if(node.left)
            stack.push(node.left);
        if(node.right)
            stack.push(node.right);

    }
    return arr;
};


/**
 * @description   根据先序遍历和中序遍历重建二叉树
 * @param  pre    树的先序遍历数组
 * @param  vin    树的中序遍历数组
 * @instance      reConstructBinaryTree([1,2,4,7,3,5,6,8],[4,7,2,1,5,3,8,6])
 */
function reConstructBinaryTree(pre, vin)
{
    if(vin.length==0)
	return null;
    var node = new TreeNode(pre[0]);
    if(vin.length==1)
        return node;
    var position = vin.indexOf(pre[0]);
    if(position==-1){
    	console.error("数据错误!");
    	return null;
    }
    node.left = reConstructBinaryTree(pre.slice(1,position+1),vin.slice(0,position));
    node.right = reConstructBinaryTree(pre.slice(position+1,pre.length),vin.slice(position+1,vin.length));
    return node;
}


/**
 * @description         根据中序遍历和后序遍历重建二叉树
 * @param  inorder      树的中序遍历数组
 * @param  postorder    树的后序遍历数组
 */
var buildTree = function(inorder, postorder) {
    if(inorder.length==0)
        return null;
    var value = postorder[postorder.length-1];
    var node = new TreeNode(value);
    if(inorder.length==1)
        return node;
    var pos = inorder.indexOf(value);
    if(pos==-1)
        console.log("数据出错");
    node.left = arguments.callee(inorder.slice(0,pos),postorder.slice(0,pos));
    node.right = arguments.callee(inorder.slice(pos+1,inorder.length),postorder.slice(pos,postorder.length-1));
    return node;
};


/**
 * @description         根据前序遍历和后序遍历重建二叉树（输出一个可能的结果）
 * @param  pre          树的前序遍历数组
 * @param  post    	树的后序遍历数组
 */
var constructFromPrePost = function(pre, post) {
    if(post.length==0){
        return null;
    }
    var position = post.indexOf(pre[1]);
    var node = new TreeNode(pre[0]);
    node.left = constructFromPrePost(pre.slice(1,position+2),post.slice(0,position+1));
    node.right = constructFromPrePost(pre.slice(position+2,pre.length),post.slice(position+1,post.length-1));
    return node;
};


/**
 * @description   	求树的最大深度
 * @param  pRoot  	树的根节点      
 */
function TreeDepth(pRoot)
{
    if(!pRoot)
        return 0;
    if(!pRoot.left&&!pRoot.right)
        return 1;
    var left = TreeDepth(pRoot.left);
    var right = TreeDepth(pRoot.right);
    return (left>right)?(left+1):(right+1);
}


/**
 * @description   	求树的最小深度
 * @param  pRoot  	树的根节点      
 * @knowledge     	树的层次遍历+判断是否没有子节点
 */
var minDepth = function(root) {
    if(!root)
        return 0;
    if(!root.left&&!root.right)
        return 1;
    var queue = [];
    var depth = 1;
    queue.push(root);
    while(queue.length>0){
        var len = queue.length;
        var count = 0;
        while(count<len){
            var node = queue.shift();
            if(!node.left&&!node.right)
                return depth;
            if(node.left)
                queue.push(node.left)
            if(node.right)
                queue.push(node.right)
            count++;
        }
        depth++;
    }
};


/**
 * @description   	求数的右视图
 * @param  root   	树的根节点 
 * @knowledge     	树的层次遍历+判断是否是最后一个节点
 */
var rightSideView = function(root) {
    var queue = [];
    var res = [];
    if(!root){
        return [];
    }
    queue.push(root);
    while(queue.length>0){
        var len = queue.length;
        var count = 0;
        while(count<len){
            var node = queue.shift();
            if(count==len-1)
                res.push(node.val);
            if(node.left)
                queue.push(node.left);
            if(node.right)
                queue.push(node.right);
            count++;
        }
    }
    return res;
};
