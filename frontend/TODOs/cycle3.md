# 前端组任务 Cycle 3

## 上个周期大家任务都完成得很好，这个周期继续加油！

## due date:
- 快考试了，尽量做多少是多少，无特定due date

## 如何使用后端？
1. 确认你已经安装了 ```Java 11```
2. 根据自己的系统，[下载并安装 Redis](https://redis.io/topics/quickstart)  
3.  启动 Redis   
    一般在terminal / powershell 里
    ```
    redis-server &
    ```
    就可以在后台启动 Redis 了
    ![redis.png](https://i.loli.net/2021/01/26/GTpjQfu8W1rn7UV.png)  
    Redis 默认在 ```6379``` 端口启动，不需要用户名和密码来连接  
    你可以通过 ```redis-cli``` 来进入 Redis 的 shell，之后 ```FLUSHALL``` 可以清除 Redis 里的所有数据

4. 下载 [我们后端的jar文件](https://drive.google.com/file/d/1rWZdC-2fWoEDplUPspSW3fAYU-ZRQDrU/view?usp=sharing)  

5. 用 
    ```
    java -jar ./backend-0.0.1-SNAPSHOT.jar
    ```
    来运行 backend，如果遇到问题请联系我


## @ 黄子恒：
**改进上周的search-2.1 v3这个页面**
- 这个界面现在还不能很好地适配手机版，请对手机版进行优化
- 小屏幕设备的优化方式可以参考GuestHome页面和NavBar这个component
  
**完成JS home-onborading这个component**
- 就是有个人骑个scooter那个，我就不放图了
- 这个component需要在我们进入 /js-home 这个页面的时候出现
- 为了方便起见，你这次需要实现的是每次进入 /js-home 这个页面，这个component都会出现（之后authentication的系统写完了之后，我会把这个component改成只出现一次）
- 点击 start 这个按钮，component会消失
- 设计图上的图片可以直接作为SVG导出（选中一块东西，点右上角export，然后点那个加号，之后选择作为SVG导出）。如何在React里面使用SVG请参考 ```/screens/GuestHome/Companies.tsx``` 这个组件
- 左边的勾勾和笑脸，可以用 Ant Design 长得差不多的icon来代替

## @ 罗景鸿：
**之前search页面的skeleton稍微有一点奇怪，稍微改一下**  
![search-skeleton.png](https://i.loli.net/2021/02/18/fsF1uj4l9Uro7TZ.png)  
现在上面两条skeleton贴在一起了，然后下面图片的skeleton跟button贴在一起了  
可以改成左边不用图片的skeleton，只放三条长条的skeleton这种布局  

**完成Login和Signup这两个页面**  
- 工作量比较大，所以week 10结束之前能做完就可以
- 设计图上的背景里面，每一块东西直接作为SVG导出（选中一块东西，点右上角export，然后点那个加号，之后选择作为SVG导出）。如何在React里面使用SVG请参考 ```/screens/GuestHome/Companies.tsx``` 这个组件
- 注意：如果不同的组件在页面上render出来完全一样，那多半是因为SVG里面的  
    ```html
    <mask id='...'>
    ```
    里面的这个id是一样的，请把每一个SVG文件的这个id改成不一样的
- 现在登录成功了之后jwt token会被存在localStorage里，登录不成功的话console里会有error，我们后端暂时还没有处理不同情况下的报错
- 注册和登录点击了button之后，在收到response之前，button需要是loading的状态
- 收到response之后，如果成功，左下角会出现成功的提示（你可能会用到 [Notification](https://ant.design/components/notification/)），如果response是error，那么如果error有message，左下角会出现error message内容的显示，如果没有message，左下角会显示 "An error occured"。成功和错误的提示框最好在样式上（颜色、图标）能有不同
- 登录成功之后会自动跳转到根页面(localhost:3000)
- Sign Up的时候多加一个Confirm Password的Input，让用户再重复输入一遍密码
- 其他不确定的细节可以跟我沟通