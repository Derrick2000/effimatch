//package com.referral.config;
//
//import com.amazonaws.auth.AWSCredentials;
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class StorageConfig {
//	
//	@Value("AKIAIMXO3F3CDYMHF26Q")
//	private String accessKey;
//	
//	@Value("sFiTsek93fA+044TzYniA4gMFpiXumha+793pFm/")
//	private String accessSecret;
//	
//	@Value("us-west-1")
//	private String region;
//	
//	@Bean
//	public AmazonS3 S3client() {
//		AWSCredentials credentials = new BasicAWSCredentials(accessKey, accessSecret);
//		return AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(region).build();
//	}
//}
