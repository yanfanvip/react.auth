package com.geekcode.react.util;

import java.net.URLEncoder;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtil {
	
	public static String getCookie(HttpServletRequest request, String name){
		Cookie[] cookies = request.getCookies();
		if(cookies == null){ return null; }
		for (Cookie cookie : cookies) {
			if(cookie.getName().equals(name)){
				return cookie.getValue();
			}
		}
		return null;
	}

	public static void addCookie(HttpServletResponse response, String name, String value) throws Exception {
        Cookie cookie = new Cookie(name, URLEncoder.encode(value, "UTF-8"));
        cookie.setMaxAge(60*60*24*30);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

	public static void removeCookie(HttpServletResponse response, String name) {
		Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
	}
    
	
	public static void main(String[] args) {
		System.out.println(System.currentTimeMillis());
		System.out.println(new Date().getTime());
	}
}
