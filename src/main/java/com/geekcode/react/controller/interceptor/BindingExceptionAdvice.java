package com.geekcode.react.controller.interceptor;

import javax.validation.ValidationException;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.geekcode.react.controller.BaseAPI;
import com.geekcode.react.exceptions.CustomizeRuntimeException;
import com.geekcode.react.model.Response;

@Configuration
@RestControllerAdvice
public class BindingExceptionAdvice extends BaseAPI{

	@ExceptionHandler(BindException.class)
	@ResponseBody
	public Response<String> hasError(BindException e) {
		throw new CustomizeRuntimeException("数据校验失败", e);
	}
	
	@ExceptionHandler(ValidationException.class)
	@ResponseBody
	public Response<String> hasError(ValidationException e) {
		throw new CustomizeRuntimeException("数据校验失败", e);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	public Response<String> hasError(MethodArgumentNotValidException e) {
		throw new CustomizeRuntimeException("数据校验失败", e);
	}
	
	@ExceptionHandler(HttpMessageConversionException.class)
	@ResponseBody
	public Response<String> hasError(HttpMessageConversionException e) {
		throw new CustomizeRuntimeException("数据转换失败", e);
	}
}
