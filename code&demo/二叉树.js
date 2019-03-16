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
 * @description   根据先序遍历和中序遍历重建二叉树
 * @param  pre    树的先序遍历数组
 * @param  vin    树的中序遍历数组
 * @instance      reConstructBinaryTree([1,2,4,7,3,5,6,8],[4,7,2,1,5,3,8,6])
 */
function reConstructBinaryTree(pre, vin)
{
	if(vin.length==0){
		return null;
	}
	var node = new TreeNode(pre[0]);
    if(vin.length==1){
        return node;
    }
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
 * @description   求数的深度
 * @param  pRoot  树的根节点      
 */
function TreeDepth(pRoot)
{
	if(!pRoot){
        return 0;
    }
    if(!pRoot.left&&!pRoot.right){
        return 1;
    }
    var left = TreeDepth(pRoot.left);
    var right = TreeDepth(pRoot.right);
    return (left>right)?(left+1):(right+1);
}
