package com.example.demo.common.utils;

import org.apache.shiro.SecurityUtils;

import com.example.demo.sys.pojo.SysUser;

public class ShiroUtils {
	public static SysUser getUser() {
		return (SysUser) SecurityUtils.getSubject().getPrincipal();
	}
	
	public static String getUsername() {
		return getUser().getUsername();
	}
}
