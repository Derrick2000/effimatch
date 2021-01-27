# week 4 前端组任务

## 注意事项：
- 文件结构被调整过了
- 先 ```git pull``` 一下，然后新开一个自己的branch，再在上面改动文件
- 所有设计都尽量能适配手机显示（目前至少能看起来正常就行）
- 设计图的link放在READEME里了

## @ 黄子恒：
**完成设计图上JS home-signed in-sent, JS home-signed in-viewed, 和 JS home-signed in-accepted, 这三个页面 （其实是一个页面）**
### 要求：
- 最上面的navbar不用管，这个后面我来处理。（不用实现登录之后navbar最右侧变成头像这个功能）
- 背景的灰色直接在less里用 ```@background-color``` 这个属性，我在 ```craco.config.js``` 里定义过了
- 卡片排布的style方式可以参考我主页的less文件。（有更好的解决方法也可以不参考）
- 下面 ```Your Applications``` 这一栏，点击 ```Sent, Viewed, Accepted``` 这三个按钮（或者link），下面长条card的数据会相应发生变化
- 需要修改的页面我放在 ```screens/JsHome``` 这个文件夹里了
- 可以去 ```App.tsx``` 查看页面被放在哪个route上

## @罗景鸿：
**完成设计图上search-Guest和search-result两个页面（其实也是一个页面）**
### 要求：
- 最上面的navbar不用管，这个后面我来处理。（背景颜色不一样也不用管了）
- searchBar可以用 ```components``` 里面 ```searchBar``` 这个组件，如果直接拿来用显示效果很不好的话，就参考 ```searchBar``` 的代码然后单独重写一个search bar
- 点了 search 按钮以后，search bar下面会出现橙色的tag，就跟设计图里一样（最右边那个灰色的```Remote``` 我暂时不太确定是干嘛的，之后会找PD确认，先不管它）
- 点了 search 按钮以后，下面的所有Cards要呈现两秒钟的 skeleton 加载状态。skeleton可以用ant design自带的skeleton组件来实现，模拟两秒的加载时间可以用 ```setTimeOut()``` 来实现
- 需要修改的页面我放在 ```screens/Search``` 这个文件夹里了
- 可以去 ```App.tsx``` 查看页面被放在哪个route上