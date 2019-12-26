package com.geekcode.react.controller.interceptor;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import com.geekcode.react.model.res.ManagerDetail;
import com.geekcode.react.util.SessionUtil;

@Component
public class AuthHandler implements HandlerInterceptor{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handlerobject) throws Exception {
		if(handlerobject instanceof HandlerMethod) {
	        HandlerMethod handle = (HandlerMethod)handlerobject;
	        Auth auth = handle.getMethodAnnotation(Auth.class);
	        if(auth != null) {
	        	ManagerDetail manager = SessionUtil.getSession(request, "MANAGER");
				if(!excludeAuth(auth, manager)) { return error(response); }
	        }
	    }
		return HandlerInterceptor.super.preHandle(request, response, handlerobject);
	}
	
	private boolean excludeAuth(Auth auth, ManagerDetail manager) {
		if(manager == null) { return false; }
		if(auth.value() != null && auth.value().length > 0) {
			boolean flag = false;
			List<String> auths = manager.getRole_detail().getAuthNames();
			for (String name : auth.value()) {
				flag = flag || auths.contains(name);
			}
			return flag;
		}
		return true; 
	}
	
	public boolean error(HttpServletResponse response) throws IOException {
		response.sendError(500, "无权限");
    	return false;
	}
}
