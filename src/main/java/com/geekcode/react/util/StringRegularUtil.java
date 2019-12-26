package com.geekcode.react.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.alibaba.fastjson.JSONObject;

public class StringRegularUtil {
	
	/**
	 * 正则提取所有双大括号 {{KEY}} 并使用JSON的对象替换
	 * 传递jsonString内容
	 */
	public static String replice(String msg, String jsonString){
		if(jsonString == null){ return msg; }
		jsonString = jsonString.trim();
		if(jsonString.startsWith("\"") && msg.trim().equals("{{data}}")){
			return jsonString.substring(1, jsonString.length() -1);
		}
		JSONObject json = null;
		if(jsonString.startsWith("\"")){
			json = new JSONObject();
			json.put("data", jsonString.substring(1, jsonString.length() -1));
		}else{
			json = JSONObject.parseObject(jsonString);
		}
		Pattern pattern = Pattern.compile("\\{\\{.+?\\}\\}");
		Matcher matcher = pattern.matcher(msg);
		while (matcher.find()) {
			String key = matcher.group().replace("{{", "").replace("}}", "").trim();
			String value = getJsonData(json, key);
			msg = msg.replace("{{" + key + "}}", value);
		}
		return msg;
	}
	
	static String getJsonData(JSONObject json, String key) {
		try {
			if(key.indexOf(".") != -1){
				String f = key.substring(0, key.indexOf("."));
				json = json.getJSONObject(f);
				key = key.substring(key.indexOf(".") + 1);
				return getJsonData(json, key);
			}
			return json.get(key).toString();
		} catch (Exception e) {
			return "";
		}
	}
	
	static String jsonStr = "{\"money\":232,\"user\":{\"address\":\"江西省鹰潭市 啊手动阀手动阀手动阀手动阀\",\"create_time\":1554528643000,\"gender\":0,\"gold\":0,\"id\":\"c0084d40-53c8-40f9-aa82-9c72f349c09a\",\"nickname\":\"测试用户\",\"password\":\"111111\",\"phone\":\"13600010002\",\"referrer\":\"1\",\"reveal\":0,\"status\":0,\"truename\":\"测试用户\",\"usable_gold\":0}}";
	public static void main(String[] args) {
		System.out.println(replice("{{user.truename}}", jsonStr));
	}
}
