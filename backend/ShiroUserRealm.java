package com.example.demo.sys.service.realm;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


import com.example.demo.sys.dao.SysUserDao;
import com.example.demo.sys.pojo.SysUser;

@Service
public class ShiroUserRealm extends AuthorizingRealm{

	@Autowired
	private SysUserDao sysUserDao;
	
	
	/**
	 * 设置凭证适配器
	 */
	@Override
	public void setCredentialsMatcher(CredentialsMatcher credentialsMatcher) {
		HashedCredentialsMatcher cMatcher = new HashedCredentialsMatcher();
		
		//设置加密算法
		cMatcher.setHashAlgorithmName("MD5");
		//加密次数
		cMatcher.setHashIterations(1);
		super.setCredentialsMatcher(cMatcher);
	}
	
	/**
	 * 完成认证数据的获取及封装，系统底层会将认证数据传递认证管理器，由认证管理器完成认证
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo
						(AuthenticationToken token) throws AuthenticationException{
			
		UsernamePasswordToken upToken = (UsernamePasswordToken) token;
		String username = upToken.getUsername();
		SysUser user = sysUserDao.findUserByUsername(username);
		if(user == null) {
			throw new UnknownAccountException();
		}
		if(user.getValid() == 0) {
			throw new LockedAccountException();
		}
		
		//封装
		ByteSource credentialsSalt = ByteSource.Util.bytes(user.getSalt());
		SimpleAuthenticationInfo info = new SimpleAuthenticationInfo
				(user,user.getPassword(),credentialsSalt, getName());
		return info;
		
	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		return null;
	}
	
}
