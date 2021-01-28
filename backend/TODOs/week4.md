# week4 后端组任务

**!记得先在本地 ```git pull``` 一下**

## due date：
- 暂定SD时间下周二之前，不过我也不太确定，时间不够的话可以跟我说

## 具体任务：
- 新建 ```Job``` 这个model，以及它对应的 Dao, Service, 和 Controller
- 每一个 ```Job``` Object的数据，对应到前端就是一张这个 Card：  
![job card.png](https://i.loli.net/2021/01/28/7A6vOWeV4SRdM9N.png)
- 每一个 Job Object应该包含哪些 private variables
    ```java
    UUID id; // 它的id，要求在create的时候自动生成
    String jobTitle; 
    String publisherEmail; // 发布这个岗位的用户的email
    Company company; // 下面会做解释
    ```
- 上面的 ```Company``` 也是你需要新建的一个model，它里面会包含公司的名字和图标，它包含的 private variables 有
    ```java
    UUID id;
    String companyName;
    String logoUrl; // 存放logo图片的url
    ```
- 你需要完成的API有：
    -   ```
        /v1/jobs
        ```
        向上面这个URL发送**GET**请求，获取到所有的 ```Job```s  
        发送**POST**请求，新建一个 ```Job``` object：  
        前端发来的请求可能有以下两种：  
        1. 
        ```json
        {
            "jobTitle":"DA Intern",
            "companyId":"xxxxxxxxxx",
            "publisherEmail":"dema@ucsd.edu"
        }
        ```
        收到这种请求，表示我们的 ```Company```s 里面已经包含了这个 ```Company``` 的信息，所以在新建 这个```Job``` Object的时候，我们根据 ```companyId``` 从数据库里找到相应的 ```Company```，然后直接把它加在我们要新建的这个 ```Job``` 里面  
        2. 
        ```json
        {
            "jobTitle":"Software Engineer",
            "companyName": "WiredCraft",
            "logoUrl":"http://xxxxxx",
            "publisherEmail":"dema@ucsd.edu"
        }
        ```
        这表示我们数据库里没有 ```WiredCraft``` 这个 ```Company```，所以我们要根据 ```companyName 和 logoUrl``` 新建一个 ```Company``` Object，把它存到数据库里，同时把它加到这个新的 ```Job``` Object里面

    -   ```
        /v1/jobs?num=[number]
        ```
        向上面这个URL发送GET请求，获取到特定数量的 ```Job```s
        举例：
        ```
        /v1/jobs?num=5
        ```
        会获取到最新的五个```Job```s  
        ```?num=``` 后面的数字应该可以用 ```@RequestParam("num")``` 来获取，但需要你去确认一下

    -   ```
        /v1/companies
        ```
        向上面这个URL发送**GET**请求，获取到所有的 ```Companies```  
        发送**POST**请求，新建一个 ```Company``` object

## 注意：
- 如果你觉得实现上述功能有更好的方式/变量命名方式有可以改进的地方，可以及时与我沟通
