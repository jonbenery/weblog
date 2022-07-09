---
title: git 关联仓库
---

**1. 当我们创建了一个远程仓库**
```
git@gitee.com:cassidy/redux.git
```

本地关联远程仓库
```
git remote add origin git@gitee.com:cassidy/redux.git
```
:::tip 提示
当以这种方式提交的远程仓库关联,在添加本地文件之前，首先拉取远程仓库最新代码git pull origin master，在执行后面的添加文件操作
:::

写代码之后,添加,并且提交
```
git add .
git commit -m "init project"
```

如果这时候报错提示
```
To gitee.com:cassidy/redux.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@gitee.com:cassidy/redux.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
```

说明当前分支的提交落后于对应的远程分支

**解决方案一:**
```
git pull --rebase origin master
```
命令解释:
使用下面的关系区别这两个操作：
git pull = git fetch + git merge
git pull --rebase = git fetch + git rebase

`git rebase` 创建一个新的提交，该提交为远程分支上的更新与本地分支更新的合并结果(merge)，但此时我们将本地分支提交记录废除，当它不存在（图中用虚线表示）。rebase的好处是避免了菱形的产生，保持提交曲线为直线，让大家易于理解。

**解决方案二:**
因为当前分支的最新提交落后于其对应的远程分支，所以我们先从远程库fetch到更新再和本地库合并，之后就可以git push操作了。

```
git fetch origin
git merge origin/master
```

如果出现
```
fatal: refusing to merge unrelated histories
```
拒绝合并不相关的历史

出现这个问题的最主要原因还是在于本地仓库和远程仓库实际上是独立的两个仓库。假如我之前是直接clone的方式在本地建立起远程github仓库的克隆本地仓库就不会有这问题了。

**解决方案**

在pull命令后紧接着使用`--allow-unrelated-history`选项来解决问题（该选项可以合并两个独立启动仓库的历史）
```
git pull origin master –allow-unrelated-histories
```
以上是将远程仓库的文件拉取到本地仓库了

然后就可以push了