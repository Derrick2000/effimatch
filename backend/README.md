# Referral Project backend  
## 技术栈/框架:
- Spring Boot
- Redis
- Spring Security

## API 文档
### 注册：
- 地址：/v1/users
- 方法：POST
- POST:
    - 权限：无
    - POST 数据例子：
    ```json
    {
        "email" : "dema@ucsd.edu",
        "password" : "password"
    }
    ```
    其中 ```email```是用户的邮箱，```password``` 是用户的密码
    用户的默认 ROLE 是 ROLE_USER 
    - 返回：
        - 返回String
        - 如果注册成功："User dema@ucsd.edu created" (200)
        - 如果注册失败："User dema@ucsd.edu already exist" (500)

### 登录：
- 地址：/login
- 方法：POST
- POST:
    - 权限：无
    - POST 数据例子：
    ```json
    {
        "email" : "dema@ucsd.edu",
        "password" : "password"
    }
    ```
    其中 ```email```是用户的邮箱，```password``` 是用户的密码
    - 返回：
        - 返回的Header里会包含JWT token
        - Name 为 Authorization， Value 为 ```"Bearer" + jwt token```
    - 返回的jwt token例子：
    ```jwt
    Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1hQHVjc2QuZWR1IiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InRlc3Q6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE2MTExNTA0ODUsImV4cCI6MTYxMTY3NjgwMH0.LGJIDMPYSPVGmhsEOr5ScUAdeBV6jFT3JJZcuoABAqbCTYPHO2rN9PZjxPFeHC5ejB6WuMJFvnhcYCI3jrPkAw
    ```
    这个token（去掉前面的Bearer）之后，可以在 [jwt.io](https://jwt.io) 进行解析

### Test:
- 地址：/v1/tests
- 方法: GET, POST
- GET: （获取所有tests）
    - 权限：ROLE_USER
    - GET 返回例子：
    ```json
    [
        {
            "id": "60ea41c4-b4a3-489d-8f63-d5aefae5d759",
            "title": "test2",
            "content": "test2"
        },
        {
            "id": "0f17e2e0-c9cd-4664-8e63-2cd389be0702",
            "title": "test1",
            "content": "test1"
        }
    ]
    ```
    获取到了所有的 ```tests```，返回一个 ```list of tests```  
    其中 id 是 一个 ```UUID```  
- POST: 
    - 权限：ROLE_USER
    - POST 数据例子：
    ```json
    {
        "title":"test1",
        "content":"test1"
    }
    ```
    ```test```的 id 会自动生成


## 关于Spring Security的使用：
- **!重要:** 必须要在 ```security/ApplicationSecurityConfig.java``` 的 ```configure``` 这个 method 里加上 ```.antMatchers("/api-address").permitAll()``` 才能让位于 ```/api-address``` 的这个api变成public的（任何人可以以任何方式使用这个api）。否则对于这个api的任何请求都会报 ```403 forbidden```
- 如果需要限制某一个 api 的某一个方法只能被有特定ROLE/特定权限的用户使用，请在这个方法上加 ```@PreAuthorize``` 标签
    - 具体例子见 ```controller/TestController.java```
    - ```@PreAuthorize``` 里面传进去的function可以是 ```hasAuthority()```, ```hasAnyAuthority```,  ```hasAnyRole()``` 等
- 或者，可以在 ```security/ApplicationSecurityConfig.java``` 里，这个api对应的 ```.antMatchers()``` 后面加相应的权限验证方法
- ROLE 和 权限 (permission) 的定义请见 ```security``` 目录下的 ```ApplicationUserRole``` 和 ```ApplicationUserPermission``` 

## 开发注意事项：
- 每一个 api 请像上面的一样，写一个基础的介绍文档，方便前端开发者使用
- 逻辑复杂的地方，命名不太直白的 function 记得写注释
- 所有重要信息（如数据库地址，端口等）请放在 application.properties 里面，在使用时用 ```@Value``` 注入

## 其他
有其他任何问题，请微信与 Tech Lead 联系
