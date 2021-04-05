package com.referral.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;
 
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
//@PropertySource(value = "classpath:config.properties")
public final class AwsS3Util {
	//private static final Logger logger = LoggerFactory.getLogger(PostController.class);

//	@Value("${aws.endpointUrl}")
//    private String endpointUrl;
	@Value("AKIAIMXO3F3CDYMHF26Q")
    private String accessKeyID;
    @Value("sFiTsek93fA+044TzYniA4gMFpiXumha+793pFm/")
    private String secretKey;
	@Value("effimatch2")
    private String bucketName;
	
    private AWSCredentials credentials ;
	private AmazonS3 s3Client;
	
    private void getInit() {
		// TODO Auto-generated constructor stub
    	if(s3Client == null) {
    		credentials = new BasicAWSCredentials(accessKeyID, secretKey);
    		s3Client = AmazonS3ClientBuilder
    				.standard()
    				.withCredentials(new AWSStaticCredentialsProvider(credentials))
    				.withRegion(Regions.US_WEST_1)
    				.build();
    		System.out.println("init");
    	}
	}
    /**
    * 查看所有可用的bucket
    * @param s3Client
     */
    public void getAllBucket(AmazonS3 s3Client){
        List<Bucket> buckets = s3Client.listBuckets();
        for (Bucket bucket : buckets) {
            System.out.println("Bucket: " + bucket.getName());
        }
    }
 
    /**
     * 查看bucket下所有的object
     */
    public void getAllBucketObject(AmazonS3 s3Client){
    	getInit();
        ObjectListing objects = s3Client.listObjects(bucketName);
        do {
            for (S3ObjectSummary objectSummary : objects.getObjectSummaries()) {
                System.out.println("Object: " + objectSummary.getKey());
            }
            objects = s3Client.listNextBatchOfObjects(objects);
        } while (objects.isTruncated());
    }
 
    /**
     * amazonS3文件上传
     * @param key 保存文件的key （以key-value形式保存）其实就是一个url路劲
     * @param file 上传文件
     */
//    public String amazonS3Upload(String key, MultipartFile file){      
    public String amazonS3Upload(String key,MultipartFile file){    
      	getInit();	
    	try {
      		byte[] data = file.getBytes();
      		ObjectMetadata metadata = new ObjectMetadata();
    		metadata.setContentLength(data.length);
    		PutObjectResult result = s3Client.putObject(new PutObjectRequest(bucketName, key, 
    				new ByteArrayInputStream(data), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
    		if (StringUtils.isNotBlank(result.getETag())) {
    			log.info("Send Data to Amazon S3 - Success, ETag is " + result.getETag());
    		}
    		log.info("Send Data to Amazon S3 - End");
      	} catch (Exception e) {
      		e.printStackTrace();
      		return null;
      	}
    	//System.out.println("upload");
      	System.out.println("Uploaded file " + key + " to S3");
      	return  key;
    }
    
    /**
     * amazonS3文件下载
     */
    public void amazonS3Downloading(String filePath, String fileName, HttpServletResponse response){
      	getInit();
    	S3Object object = s3Client.getObject(new GetObjectRequest(bucketName,filePath));
        if(object!=null){
            System.out.println("Content-Type: " + object.getObjectMetadata().getContentType());
            InputStream input = null;
            // FileOutputStream fileOutputStream = null;
            OutputStream out =null;
            byte[] data = null;
            try {
                //获取文件流
            	//信息头，相当于新建的名字
				response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
                input=object.getObjectContent();
                data = new byte[input.available()];
                int len = 0;
            	out = response.getOutputStream();
                //fileOutputStream = new FileOutputStream(targetFilePath);
                while ((len = input.read(data)) != -1) {
                    out.write(data, 0, len);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally{
            	//关闭输入输出流
                if(out!=null){
                    try {
                    	out.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if(input!=null){
                    try {
                        input.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
 
    /**
     * 文件删除
     * @param key 删除文件key
     */
    public void amazonS3DeleteObject(String key){
    	getInit();
        s3Client.deleteObject(bucketName, key);
    }
}

