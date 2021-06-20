# 前端组任务cycle 4

## 上周的任务大家也完成得很好！这是本学期最后一个cycle了，大家继续加油！

## 后端update：
- [点击这个链接下载最新的后端 jar file](https://drive.google.com/file/d/1FDxNj6tZpADSzRsUiSkkvx72BQFM1kR3/view?usp=sharing)
- **注意！** 注册的地址发生了改动

## 后端注册方式update:
- 后端运行起来之后，先向 ```http://localhost:8080/v1/send-verification``` 发送POST请求，来获取验证码  
    request body为：
    ```json
    {
        "email":"dm4524@nyu.edu"
    }
    ```
    其中"email"是要注册的用户的email
- 邮箱收到验证码后，向```http://localhost:8080/register``` 发送POST请求来注册：  
    ```json
    {
        "email":"dm4524@nyu.edu",
        "password":"mdk20010220",
        "username":"dema",
        "code":589538
    }
    ```
    其中"code"是你邮箱里收到的验证码  
    如果验证码不正确或已经过期，后端会返回相应的错误
- 如果上述哪个环节not working，请联系我 

## @ 黄子恒：
- 完成```post details``` 这个页面。```Minimum qualification``` 右上角的那个link icon我也不太确定是干什么的，可以等群上PD回复了之后再说
- 开始做```get-referred-single``` 这个页面（就在```post details``` 设计图的右边）
- 这个页面下面的 ```Position``` 和 ```Introduction``` 这两个板块都暂时还不用做，只用实现用户可以上传文件，然后可以像设计图上一样显示出来上传的文件对应的icon（包括名字和后缀），然后点击icon右边的 × 可以把这个文件删除。
- 文件数据也需要存在state里
- 我觉得设计图她们可能还没做完，所以写码的时候只用实现上面说的功能就行了，暂时完全不用管布局。就算写出来长得很丑也没关系。

## @ 罗景鸿
- 注册的方式和endpoint发生了改动，具体请参考最上面的说明
- 需要实现用户先请求验证码，然后正确输入邮箱里的验证码才能注册的功能
- 只用实现功就可以，因为设计图还没做出来所以完全不用在意“请求验证码button”的布局和长相
- 我把less file里的整个input box的z-index改成2了，这样用户才能输入
- password和re-enter password的state应该分开，不然输入密码的时候两个field会同时变
- 需要实现的检查功能：
    - 检查邮箱是否valid（或许ant design的input组件自带检查功能，如果没有的话可以用regex检查）
    - 检查密码是否valid（至少包含英文字母和数字，长度为八位）
    - 两次输入的密码不一致
    - 如果不valid，报错方式取决于你。或许可以在input field下面显示一行红字？
- 一个小细节：现在"continue with LinkedIn" 这个蓝色的button周围有一圈很窄的橙色border，希望可以看一下怎么把这个border变成跟主体颜色一致（如果ant design的component API里没有对应的解决方法，可以在网页上inspect了之后用css来覆盖对应的style），同时这个button hover的时候颜色希望也可以浅一点的蓝色，而不是橙色
- 其他细节请参考上周的write up继续补全