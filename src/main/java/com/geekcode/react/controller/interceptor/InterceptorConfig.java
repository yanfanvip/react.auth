package com.geekcode.react.controller.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer{
	
	@Autowired
	ManagerLoginHandlerInterceptor managerLoginHandle;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(managerLoginHandle)
			.addPathPatterns("/api/**")
			.excludePathPatterns("/api/manager/login")
			.excludePathPatterns("/api/manager/loginout")
			.excludePathPatterns("/api/manager/verificationcode")
			.excludePathPatterns("/api/public/**");
		
		WebMvcConfigurer.super.addInterceptors(registry);
	}
}
