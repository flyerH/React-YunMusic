# React-YunMusic
##React仿网易云音乐

React入门练手项目，在线访问地址请戳 [Demo](http://music.strawtc.cn)
  
  
网易云音乐的API大部分来源于另一个项目 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
  
---
### 效果展示
![效果展示](https://static.strawtc.cn/wp-content/uploads/YunMusicRecord.gif)

### 安装
```
npm install
```
### 运行
```
npm run start
```
浏览自动打开 [http://localhost:3000/](http://localhost:3000/)

### 打包编译
```
npm run build
```
 
---  

项目想要完整运行还需要上面提到的`NeteaseCloudMusicApi`项目提供后台数据

你可以直接运行该项目，让其监听`4000`端口，这属于开发环境；如果想要以生产环境使用，也可以修改`NeteaseCloudMusicApi`项目配置文件，将两个项目合二为一

不管哪种方法，你都必须先将`NeteaseCloudMusicApi`项目`app.js`文件中跨域代码  
```
//res.header("Access-Control-Allow-Origin", "*")
```
的注释取消

生产环境配置   
具体是在`NeteaseCloudMusicApi`项目的`app.js`文件中，加入以下两行
```
app.use(express.static('./'));
app.use(express.static('public'));
```
然后将本项目`npm run build`之后，`dist`目录下的文件拷贝到`NeteaseCloudMusicApi`项目下的`public`文件夹   
最后在`NeteaseCloudMusicApi`文件夹下执行`node app.js`命令即可