package com.geekcode.react.util;

import java.util.concurrent.TimeUnit;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

public class VerificationCodeUtil {
	
	static Cache<String, String> cache = CacheBuilder.newBuilder()
            .maximumSize(10000)
            .expireAfterAccess(15, TimeUnit.MINUTES)
            .build();

	public static String get(String key){
		try {
			return cache.getIfPresent(key);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static void set(String key, String value) {
		cache.put(key, value);
	}
	
	public static void clear(String key){
		cache.invalidate(key);
	}
}
