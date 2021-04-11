注册用户
(1) Post: localhost:8080/v1/send-verification
	Parameter:email
(2) Post: localhost:8080/register
	Parameter:email,password,username,verification-code
	
上传文档到aws
	Post: localhost:8080/v1/file/upload
	Body: (Key,Value) = (uploadFile,${file})
	