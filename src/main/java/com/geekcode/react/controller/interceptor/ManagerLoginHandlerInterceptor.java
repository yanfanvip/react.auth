package com.geekcode.react.controller.interceptor;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.geekcode.react.model.res.ManagerDetail;
import com.geekcode.react.service.ManagerService;
import com.geekcode.react.util.CookieUtil;
import com.geekcode.react.util.SessionUtil;
import com.geekcode.react.util.TokenUtil;

@Component
public class ManagerLoginHandlerInterceptor implements HandlerInterceptor {
	
	@Autowired
	ManagerService managerService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		ManagerDetail manager = SessionUtil.getSession(request, "MANAGER");
		if(manager != null) {
			return HandlerInterceptor.super.preHandle(request, response, handler);
		}
		String token_user = CookieUtil.getCookie(request, "TOKEN");
		String auth = CookieUtil.getCookie(request, "AUTH");
		if(token_user != null && auth != null) {
			try {
				String username = TokenUtil.getUser(token_user);
				manager = managerService.getByUsername(username);
				String _auth = TokenUtil.getToken(manager.getId() + ":" + manager.getPassword());
				if(_auth.equals(auth)){
					SessionUtil.setSession(request, "MANAGER", manager);
					return HandlerInterceptor.super.preHandle(request, response, handler);
				}
			} catch (Exception e) {
				CookieUtil.removeCookie(response, "TOKEN");
				CookieUtil.removeCookie(response, "AUTH");
			}
		}
		return error401(response);
	}
	
	public boolean error401(HttpServletResponse response) throws IOException {
		response.sendError(401, "need login");
    	return false;
	}
}
