# Cycle 3 后端组任务

## 本周任务：
**Jobs Service:**  
-   ```
    /v1/jobs?search=[key word]
    ```
    向这个URL发送GET请求，返回"jobTitle"或"companyName"中包含"key word"的 Job
- 所以我们现在如果像这个URL发送GET请求：
    ```
    /v1/jobs?search=San+Diego&num=3
    ```
    会返回包含"San Diego"的最新三个 Job
- ```
    /v1/jobs?skip=[num]
    ```
    向这个URL发送GET请求，返回所有 Jobs，但要去掉最前面的 [num] 个 Job

**Referrer Service:**
- 完成一个新的Service，命名为 Referrer。这个Service对应到前端就是这个页面：  
![search2.1-v3.png](https://i.loli.net/2021/02/08/k2tp9fXSzGe7KZ3.png)
- 这是一个Internal service （在后端内部使用，前端不会直接获取这个service的数据，所以暂时不需要写controller）
- model里面不需要包含"avatar"（头像）这个field
- 其他需要包含哪些field由你自己根据设计图上提供的信息来决定
- 注意：每一个像 "Software Development Engineer, Machine Learning" 这样的 card 对应的就是一个 Job object，所以你应该需要看设计图上包含的信息，对我们的 Job object 做出相应调整，比如给 Job 里加 "place", "category" ... 这些 field
- 你还需要新建一个叫 Review 的 model来代表下面的reviews。每一个Referrer里面应该会存它的reviews的id
- 我后面会把Referrer的id作为foreign key加到 Application User 里面去，这些你不用担心
- 其他不清楚的细节请及时与我沟通