## rebase 功能一：合并提交记录
1.合并最近的 4 次提交纪录，执行：
```
git rebase -i HEAD~4
```
2.这时候，会自动进入 `vi` 编辑模式：

3.如果你异常退出了 `vi` 窗口，不要紧张：

```
git rebase --edit-todo
```

4.这时候会一直处在这个编辑的模式里，我们可以回去继续编辑，修改完保存一下：

```
git rebase --continue
```



## rebase 功能二：分支合并

比如说你和你的同事小明一起开发代码，你在 dev 分支改，要合并的时候发现 master 分支已经被小明更新了，这个时候你要：

1. 先切到 master 分支，将 master 分支拉到最新
2. 切换分支到需要 rebase 的分支，这里是 dev 分支
3. 执行 `git rebase master`，有冲突就解决冲突，解决后直接 `git add .` 再 `git rebase --continue` 即可
4. 切换到 master 分支，执行 `git merge dev`
5. 最后 `git push origin master`

git rebase 操作会将 dev 分支的所有基于 master 分支提交点之后的 commit 打散成一个一个的 patch，并重新生成一个新的 commit hash 值，再次基于 master 分支目前最新的 commit 点上进行提交，并不根据两个分支上实际的每次提交的时间点排序，rebase 完成后，合并分支时也不会生成一个新的 commit 点，可以保持整个分支树的完美线性记录。




## 最后
如果你想要你的分支树呈现简洁，线性的 commit 记录，那就采用 rebase，否则，就用 merge 吧



 

 

 

 