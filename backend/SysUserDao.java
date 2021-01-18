package com.example.demo.sys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.sys.pojo.SysUser;

@Mapper
public interface SysUserDao {

	@Select("select * from sys_users where username=#{username}")
	SysUser findUserByUsername(String username);
}
