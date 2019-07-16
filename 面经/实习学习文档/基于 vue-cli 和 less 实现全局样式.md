# Vue + less 全局定义样式

1. 安装 sass-resources-loader

2. 找到build文件夹下面的 utils.js

3. generateLoaders('less') 修改成

```javascript
generateLoaders('less').concat({
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/style/index.less')
    }
}),
```

 这样在任何组件里面都能使用 index.less 里面定义好的全局样式 

 

 

 



