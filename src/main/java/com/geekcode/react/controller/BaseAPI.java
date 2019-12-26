package com.geekcode.react.controller;

import com.geekcode.react.model.Response;

public class BaseAPI{

	public Response<Void> SUCCESS() {
		Response<Void> response = new Response<Void>();
		response.setCode(0);
		return response;
	}
	
	public <T> Response<T> SUCCESS(T data) {
		Response<T> response = new Response<T>();
		response.setCode(0);
		response.setData(data);
		return response;
	}
	
	public <T> Response<T> SUCCESS(T data, String message) {
		Response<T> response = new Response<T>();
		response.setCode(0);
		response.setMessage(message);
		response.setData(data);
		return response;
	}
	
	/**
	 * 错误码
	 * login : 100**
	 * 	10001 ： 验证码错误
	 * 	10002 ： 密码错误
	 * 	10003 ： 手机号码和注册手机号码不一致
	 */
	public <T> Response<T> FAIL(int code, String message) {
		Response<T> response = new Response<T>();
		response.setCode(code);
		response.setMessage(message);
		return response;
	}
}
