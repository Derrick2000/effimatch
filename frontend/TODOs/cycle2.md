# 前端组任务 Cycle 2

## 注意事项：
- 之前除了master branch外，所有其他branches都被merge并删除了
- 还是先在master branch上pull一下，然后再新开branch工作

## due date:
- 暂定SD时间下周一之前

## @ 黄子恒：
**完成设计图上search-2.1 v3这个页面，并稍微改进一下之前的js-home页面**
![search2.1-v3.png](https://i.loli.net/2021/02/08/k2tp9fXSzGe7KZ3.png)
### 要求：
- 之前的 js-home 页面上，鼠标hover在下面的tabs的标签上时，cursor要变成pointer
- 这个页面放在 ```screens/Referers``` 里，对应的route是 ```/referers```
- 最下面的 "reviews" 这个板块里的reviews，可以用 Ant Design 的 [comment](https://ant.design/components/comment-cn/) 来实现。Ant Design 的 comment 的头像和时间在评论文字的上方，就这样就可以，不用调整得跟设计图一样。
- 暂时忽略 nav bar 和这个页面颜色不一致的问题

## @罗景鸿：
**完成设计图上pop up这个部件**  
![popup.png](https://i.loli.net/2021/02/08/xA3j9kKcGFu7zMt.png)  
这个部件在R-success 和 complete这两个页面都出现过
### 要求：
- 我们在使用这个部件的时候，可以自定义上面出现的文字，比如：
    ```html
    <Popup
        text="Great! You finished your referral request"
        // 可能还需要传入其他的props，比如 visible
    >
    ```
    出现的 Popup 就跟 complete 这个页面上的长得一样
- 我们如果不传入 onClick 这个props，那么popUp上就不会有按钮
- 如果向 onClick 这个 props 传入一个function，那Popup上就会出现一个按钮，并且点击按钮的事件会被相应绑定
- Popup上面的icon不一样要与设计图上的长得一样，可以直接用 Ant Design 提供的 icon
- 你可能会需要用到 Ant Design 的 [Modal](https://ant.design/components/modal-cn/)，要是 Modal 右下角的 button 实在没有办法居中，那就放在右下角也可以
- Popup对应的代码请在 ```components``` 里新建文件夹和文件，然后写在里面
- 请自己创建一个页面 (比如叫 test-popup)，在里面导入你写好的 Popup component 进行测试，然后把这个页面加到 ```App.tsx``` 对应的 route里面就可以显示出来了