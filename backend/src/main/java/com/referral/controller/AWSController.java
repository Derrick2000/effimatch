package com.referral.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.referral.utils.AwsS3Util;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/v1/file")
public class AWSController {
	
	@Autowired
	private AwsS3Util s3Utils;
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(MultipartHttpServletRequest multipartRequest){
		List<MultipartFile> files = multipartRequest.getFiles("uploadFile");
		String fileName = UUID.randomUUID().toString() + "_" + files.get(0).getOriginalFilename(); // 避免命名重复问题
		return new ResponseEntity<> (s3Utils.amazonS3Upload(fileName,  files.get(0)),HttpStatus.OK);
	}
}
