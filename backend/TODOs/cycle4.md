# Cycle 4 后端组任务

**上周任务完成得很好，最后一个cycle了，加油！**

## 本周任务：
**实现AWS S3文件上传**
- 新建一个Util，叫```AwsS3Util```
- 这个Util里需要有method可以完成：
    - 给它一个file，它把这个file上传到AWS S3里面，然后return file存储的地址
    - 给它一个file的key，它可以删除这个key对应的file
- 完成上述功能需要先创建AWS账号，并在AWS的S3服务里新建一个bucket
- 可以YouTube或者别的地方搜一下 SpringBoot 如何实现 AWS S3 文件上传
- 新建了bucket之后应该需要改bucket的配置文件才能实现 SpringBoot 文件上传，这一点教程里应该会讲到。如果教程里没有提到，并且在后端代码正确的情况下还是无法上传文件，就联系我
- 之前会议提到的 ```SwaggerUI``` 可以先不用管，我这周先去看一下再说