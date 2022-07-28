---
title: git常用操作
---
**1. 对于为提交到暂存区域的文件的撤销**

```
git checkout .
```
**2. 远程已有remote_branch分支并且已经关联本地分支local_branch且本地已经切换到local_branch**
```
git push
```
**3. 远程已有remote_branch分支但未关联本地分支local_branch且本地已经切换到local_branch**
```
git push -u origin/remote_branch
```
**4. 远程没有有remote_branch分支并，本地已经切换到local_branch**
```
git push origin local_branch:remote_branch
```
**5. 从远程仓库里拉取一条本地不存在的分支时**
```
 git checkout -b 本地分支名 origin/远程分支名
```
**6. 回退版本**
```
git reset --hard 版本id
```
**7. 重命名分支名称**
```
 git branch -m <old_name> <new_name> 改名字
```
**8. 删除远程分支**
```
git push origin –-delete 分支名
```
**9. 删除本地分支**
```
git branch -d <branch-name>
```
**10. Git 取消所有文件的追踪**
```
 git rm -r —cached . //不删除本地文件
 git rm -r —f . //删除本地文件
```
**11. Git clone后切换分支，并建立追踪（track）**
```
git checkout -t origin/分支名
```
**12. 关联git仓库**
创建新的仓库
```powershell
echo "# gitHelp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:jonbenery/gitHelp.git
git push -u origin main
```
关联已经存在的仓库
```powershell
git remote add origin git@github.com:jonbenery/gitHelp.git
git branch -M main
git push -u origin mains
```

**13. 解除远程仓库关联**
```powershell
git remote rm origin
```
