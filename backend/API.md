注册用户
(1) Post: localhost:8080/v1/send-verification
	Parameter:email
(2) Post: localhost:8080/register
	Parameter:email,password,username,verification-code
	

登录
Post: localhost:8080/login
Parameter:email,password
Returns authorization code


JOB:
发布新工作：Post: localhost:8080/v1/jobs
	      Parameter(with authorization code for the user) Example:
	{
    		"jobTitle":"Engineer4",
    		"jobDescription":"High paid",
    		"requiredExperience":"2 yrs",
    		"jobLink":"www.7k7k.com",
    		"companyName":"UCB",
    		"location":"CA",
    		"applicationDeadline":"2100"
	}
	
查找所有工作：Get:localhost:8080/v1/jobs
	说明：最新的在最下面

输入关键字查询工作：Get:localhost:8080/v1/jobs?search=Engineer
跳过5条结果查询工作： Get:localhost:8080/v1/jobs?skip=5
查询最早发布的2条工作 Get:localhost:8080/v1/jobs?num=2
	
	
上传文档到aws
	Post: localhost:8080/v1/file/upload
		Body: (Key,Value) = (uploadFile,${file})
	