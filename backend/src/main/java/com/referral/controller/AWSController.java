package com.referral.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.referral.utils.AwsS3Util;

@RestController
@RequestMapping("/v1/file")
public class AWSController {
	
	@Autowired
	private AwsS3Util s3Utils;
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam(value="file")MultipartFile file){
		System.out.println("here");
		String key = UUID.randomUUID().toString();
		return new ResponseEntity<> (s3Utils.amazonS3Upload(key, file),HttpStatus.OK);
	}
}
