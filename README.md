# React-YunMusic  
## React仿网易云音乐

React入门练手项目
  
  
网易云音乐的API部分由我抓包获取，另一部分来源于[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)  

~~由于网易云音乐API失效，原作者还没修复，我针对我用到的API进行抓包，并FORK了原作者的项目进行部分修复，所以你可以暂时用我上传的[flyerH/NeteaseCloudMusicApi](https://github.com/flyerH/NeteaseCloudMusicApi)~~
  
由于网易云音乐版权问题，可能有部分歌曲双击播放后没有反应，过阵子没有好转的话考虑更换API接口


### 版本更新
##### 2018.11.02
更新不安全依赖
##### 2018.10.09
更新原本不安全的依赖
##### 2017.11.25
修复API


---
### 效果展示  
##### 排行榜歌曲播放
![排行榜](https://static.strawtc.cn/wp-content/uploads/YunMusicRecord1.gif)  

##### 歌曲搜索播放&&进度/音量调整
![歌曲搜索](https://static.strawtc.cn/wp-content/uploads/YunMusicRecord2.gif)  

##### 私人FM&&歌词滚动
![私人FM](https://static.strawtc.cn/wp-content/uploads/YunMusicRecord3.gif)  

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
