# week5 后端组任务

## 注意事项：
- 现在 ```Jobs``` 和 ```Companies``` 这两个 service 要实现的东西和 week 4 文档里的不同了，记得去看一下最新代码里 ```Jobs``` 和 ```Companies``` 对应的 model 和逻辑，如果哪里看不懂的话可以问我  
现在的模型和逻辑都更加简单直白  
- 之前除了master branch外，所有其他branches都被merge并删除了
- 还是先在master branch上pull一下，然后再新开branch工作

## due date:
- 暂定SD时间下周一之前

## 本周任务：  
- 查看代码里的 // TODO 注释，根据 TODO 完成内容。（可以查看你使用的IDE如何查看代码里的所有 TODO 注释的位置在哪里，比如说如果用的是 IntelliJIDEA 的话可以在右下角查看）  
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
    /v1/jobs/{:id}
    ```
    向上面这个URL发送PUT请求，更改 {:id} 这个 Job Object   
    举例：  
    向
    ```
    /v1/jobs/be4a2d9f-7b91-4ab4-adfc-084b6ff9890e
    ```
    发送 PUT 请求：  
    假设 ```be4a2d9f-7b91-4ab4-adfc-084b6ff9890e``` 这个Job本来是这样的：  
    ```json
    {
        "id": "80268eff-dbf2-4d80-ac97-8af74849d57f",
        "jobTitle": "DA Intern",
        "publisherEmail": "dema@ucsd.edu",
        "companyName": "UCSD"
    }
    ```
    我发送 PUT 请求的时候，Body里面的数据是这样的：  
    ```json
    {
        "jobTitle":"Data Analytics Intern"
    }
    ```
    那么这个Object就会被改成：
    ```json
    {
        "id": "80268eff-dbf2-4d80-ac97-8af74849d57f",
        "jobTitle": "Data Analytics Intern",
        "publisherEmail": "dema@ucsd.edu",
        "companyName": "UCSD"
    }
    ```
    同时，这个请求应该返回被更改之后的Job Object

- 向 ```Job``` 的 model里加入 ```createdAt``` 和 ```updatedAt``` 属性，具体如何实现需要你自行查阅资料。```createdAt``` 的要求是在每一个 ```Job``` 被创建的时候，它的 ```createdAt``` 和 ```updatedAt``` 就是它被创建的时间（时间的具体格式不限）。这个Job被update的时候， ```updatedAt```需要被相应被更新。（这两个属性不一定要叫这两个名字，如果Spring Data Redis里面有类似的实现，直接用就可以了）
- 从
    ```
    /v1/jobs
    ```
    获取所有 Jobs 的时候，获取到的 Jobs 需要按 ```createdAt``` 降序排序 （最后被创建的 Job 在最前面）  
  

## 注意：
- 如果你觉得实现上述功能有更好的方式/变量命名方式有可以改进的地方，可以及时与我沟通
