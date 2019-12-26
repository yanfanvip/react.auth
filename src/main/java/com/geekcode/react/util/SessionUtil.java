package com.geekcode.react.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
	
	public static String getSessionId(HttpServletRequest request){
		HttpSession session = request.getSession();
		if(session == null){
			session = request.getSession(true);
		}
		return session.getId();
	}

	@SuppressWarnings("unchecked")
	public static <T> T getSession(HttpServletRequest request, String name){
		HttpSession session = request.getSession();
		if(session == null){ return null; }
		try {
			return (T) session.getAttribute(name);
		} catch (Exception e) {
			session.removeAttribute(name);
			return null;
		}
	}
	
	public static <T> void setSession(HttpServletRequest request, String name, T value) {
		HttpSession session = request.getSession();
		if(session == null){
			session = request.getSession(true);
		}
		session.setAttribute(name, value);
	}
}
