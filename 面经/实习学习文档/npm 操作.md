# npm 操作

### 发布一个 npm 包

初始化项目，根据提示，填写相应信息，得到 `package.json`文件

```
npm init
```

进行编码，发布前创建 `.npmignore` 文件，过滤不需发布的文件夹，如

```
# 排除 lib文件
lib/
```

登陆 npm，发布包

```
# 登录 npm， 若无账号，请在https://www.npmjs.com/ 注册账号
npm adduser
Username: *****
Password: *****
Email: (this IS public) 填写邮箱
Logged in as youthcity on https://registry.npmjs.org/.

# 发布包
npm publish
```

访问 <https://www.npmjs.com/ >查看发布的包



### 更新你发布的 npm 包

```
npm version <update_type>

# update_type 有三个参数:
# patch：补丁 
# minor：小改
# major：大改

npm publish
```

如果不行就改一下  `package.json` 里的  `version` ，然后再  `npm publish`



### 使用 nrm 切换源

安装 nrm

```
npm install nrm -g --save
```

查看所有源

```
nrm ls
```

使用某一源

```
nrm use [源名字]
```





