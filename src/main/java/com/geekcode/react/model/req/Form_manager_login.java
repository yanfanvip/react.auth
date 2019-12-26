package com.geekcode.react.model.req;

import javax.validation.constraints.NotEmpty;

public class Form_manager_login {
	
	@NotEmpty(message="用户名不能为空")
	private String username;

	@NotEmpty(message="密码不能为空")
	private String password;
	
	@NotEmpty(message="验证码不能为空")
	private String code;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
