package com.geekcode.react.util;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;

public class ObjectUtil {
	
	public static <T> Map<String, T> listTomap(List<T> list, String field) throws Exception{
		Map<String, T> map = new HashMap<>();
		for (T t : list) {
			String key = get(t, field);
			map.put(key, t);
		}
		return map;
	}
	
	public static Map<String, List<Object>> listTomap2(List<?> all, String field) throws Exception{
		Map<String, List<Object>> map = new HashMap<>();
		for (Object t : all) {
			List<Object> ts = map.get(t);
			if(ts == null){
				ts = new ArrayList<>();
			}
			ts.add(t);
			String key = get(t, field);
			map.put(key, ts);
		}
		return map;
	}
	
	public static Map<String, String> format(Object obj, Class<? extends Annotation> annotationClass) {
		if(obj == null){ return null; }
		Class<? extends Object> clazz = obj.getClass();
		List<Field> fields = getFields(clazz);
		Map<String, String> map = new HashMap<String, String>();
		for (Field field : fields) {
			if(!field.isAnnotationPresent(annotationClass)){ continue; }
			try {
				String data = get(obj, field);
	            map.put(field.getName(), data);
			} catch (Exception e) {
				throw new RuntimeException("can not parse this field: " + field.getName(), e);
			}
		}
		return map;
	}
	
	public static <T> T mapConvert(Map<String, String> obj, Class<T> target) throws Exception{
		if(obj == null){ return null; }
		T t = target.newInstance();
		Map<String, Field> targetFields = getFieldMaps(target);
		for (String name : targetFields.keySet()) {
			if(obj.containsKey(name)){
				Field targetField = targetFields.get(name);
				String value = obj.get(name);
				if(value != null){
					set(t, targetField, value);
				}
			}
		}
		return t;
	}
	
	public static <T> T copyField(Object obj, T t) throws Exception{
		if(obj == null){ return null; }
		if(t == null) { return null; }
		Class<?> target = t.getClass();
		Class<? extends Object> source = obj.getClass();
		Map<String, Field> sourceFields = getFieldMaps(source);
		Map<String, Field> targetFields = getFieldMaps(target);
		for (String name : targetFields.keySet()) {
			if(sourceFields.containsKey(name)){
				Field sourceField = sourceFields.get(name);
				Field targetField = targetFields.get(name);
				String value = get(obj, sourceField);
				if(value != null){
					set(t, targetField, value);
				}
			}
		}
		return t;
	}
	
	public static <T> T convert(Object obj, Class<T> target) throws Exception{
		if(obj == null){ return null; }
		T t = target.newInstance();
		Class<? extends Object> source = obj.getClass();
		Map<String, Field> sourceFields = getFieldMaps(source);
		Map<String, Field> targetFields = getFieldMaps(target);
		for (String name : targetFields.keySet()) {
			if(sourceFields.containsKey(name)){
				Field sourceField = sourceFields.get(name);
				Field targetField = targetFields.get(name);
				String value = get(obj, sourceField);
				if(value != null){
					set(t, targetField, value);
				}
			}
		}
		return t;
	}
	
	public static Map<String, String> format(Object obj) {
		if(obj == null){ return null; }
		Class<? extends Object> clazz = obj.getClass();
		List<Field> fields = getFields(clazz);
		Map<String, String> map = new HashMap<String, String>();
		for (Field field : fields) {
			try {
				String data = get(obj, field);
	            map.put(field.getName(), data);
			} catch (Exception e) {
				throw new RuntimeException("can not parse this field: " + field.getName(), e);
			}
		}
		return map;
	}
	
	public static Map<String, Field> getFieldMaps(Class<?> clazz){
		Map<String, Field> fields = new HashMap<>() ;
		if(clazz.getSuperclass() != null){
			fields.putAll(getFieldMaps(clazz.getSuperclass()));
		}
		for (Field field : clazz.getDeclaredFields()) {
			if(Modifier.isStatic(field.getModifiers())){ continue; }
			if(Modifier.isFinal(field.getModifiers())){ continue; }
			fields.put(field.getName(), field);
		}
		return fields;
	}
	
	public static List<String> getFieldNames(Class<?> clazz){
		List<String> fields = new ArrayList<>() ;
		if(clazz.getSuperclass() != null){
			fields.addAll(getFieldNames(clazz.getSuperclass()));
		}
		for (Field field : clazz.getDeclaredFields()) {
			if(Modifier.isStatic(field.getModifiers())){ continue; }
			if(Modifier.isFinal(field.getModifiers())){ continue; }
			fields.add(field.getName());
		}
		return fields;
	}
	
	public static List<Field> getFields(Class<?> clazz){
		List<Field> fields = new ArrayList<>() ;
		if(clazz.getSuperclass() != null){
			fields.addAll(getFields(clazz.getSuperclass()));
		}
		for (Field field : clazz.getDeclaredFields()) {
			if(Modifier.isStatic(field.getModifiers())){ continue; }
			if(Modifier.isFinal(field.getModifiers())){ continue; }
			fields.add(field);
		}
		return fields;
	}
	
	public static Object getByField(Object obj, String fieldName) throws Exception{
		Field field = getFieldMaps(obj.getClass()).get(fieldName);
		boolean accessible = field.isAccessible();
		if(!accessible){field.setAccessible(true);}
		Object fieldData = field.get(obj);
		if(fieldData == null){ return null; }
		if(!accessible){field.setAccessible(false);}
        return fieldData;
	}
	
	public static Object getByField(Object obj, Field field) throws IllegalArgumentException, IllegalAccessException{
		boolean accessible = field.isAccessible();
		if(!accessible){field.setAccessible(true);}
		Object fieldData = field.get(obj);
		if(fieldData == null){ return null; }
		if(!accessible){field.setAccessible(false);}
        return fieldData;
	}
	
	public static String get(Object obj, String fieldName) throws Exception{
		Field field = getFieldMaps(obj.getClass()).get(fieldName);
		boolean accessible = field.isAccessible();
		if(!accessible){field.setAccessible(true);}
		Object fieldData = field.get(obj);
		if(fieldData == null){ return null; }
		Class<?> fieldClazz = field.getType();
		String data = null;
		if (isPrimitive(fieldClazz)){//类型不用转换
        	data = fieldData.toString();
        }else if(fieldClazz == java.util.Date.class){//时间类型
        	data = ((Date)fieldData).getTime() + "";
        } else {//其他类型
        	data = JSON.toJSONString(fieldData);
        }
		if(!accessible){field.setAccessible(false);}
        if(data == null){ throw new RuntimeException("can not parse this field: " + field.getName() + " : " + fieldData); }
        return data;
	}
	
	public static String get(Object obj, Field field) throws IllegalArgumentException, IllegalAccessException{
		boolean accessible = field.isAccessible();
		if(!accessible){field.setAccessible(true);}
		Object fieldData = field.get(obj);
		if(fieldData == null){ return null; }
		Class<?> fieldClazz = field.getType();
		String data = null;
		if (isPrimitive(fieldClazz)){//类型不用转换
        	data = fieldData.toString();
        }else if(fieldClazz == java.util.Date.class){//时间类型
        	data = ((Date)fieldData).getTime() + "";
        } else {//其他类型
        	data = JSON.toJSONString(fieldData);
        }
		if(!accessible){field.setAccessible(false);}
        if(data == null){ throw new RuntimeException("can not parse this field: " + field.getName() + " : " + fieldData); }
        return data;
	}
	
	public static void set(Object obj, Field field, String value) throws IllegalArgumentException, IllegalAccessException {
		field.setAccessible(true);
		Class<?> fieldClazz = field.getType();
		if (isPrimitive(fieldClazz)){//类型不用转换
			if(fieldClazz == boolean.class || fieldClazz == Boolean.class){
				field.set(obj, Boolean.valueOf(value));
			}else if(fieldClazz == short.class || fieldClazz == Short.class){
				field.set(obj, Short.valueOf(value));
			}else if(fieldClazz == int.class || fieldClazz == Integer.class){
				field.set(obj, Integer.valueOf(value));
			}else if(fieldClazz == long.class || fieldClazz == Long.class){
				field.set(obj, Long.valueOf(value));
			}else if(fieldClazz == double.class || fieldClazz == Double.class){
				field.set(obj, Double.valueOf(value));
			}else if(fieldClazz == float.class || fieldClazz == Float.class){
				field.set(obj, Float.valueOf(value));
			}else if(fieldClazz == BigInteger.class){
				field.set(obj, new BigInteger(value));
			}else if(fieldClazz == BigDecimal.class){
				field.set(obj, new BigDecimal(value));
			}else if(fieldClazz == byte.class || fieldClazz == Byte.class){
				field.set(obj, Byte.valueOf(value));
			}else if(fieldClazz == byte[].class || fieldClazz == Byte[].class){
				field.set(obj, value.getBytes());
			}else if(fieldClazz == char.class || fieldClazz == Character.class){
				field.set(obj, value.charAt(0));
			}else{
				field.set(obj, value);
			}
        }else if(fieldClazz == java.util.Date.class){//时间类型
        	long time = Long.valueOf(value);
        	field.set(obj, new java.util.Date(time));
        }else if(fieldClazz == java.sql.Date.class){
        	long time = Long.valueOf(value);
        	field.set(obj, new java.sql.Date(time));
        }else if(fieldClazz.isAssignableFrom(List.class)){
            List<?> list = JSONArray.parseArray(value, fieldClazz);
            field.set(obj, list);
        }else if(fieldClazz.isAssignableFrom(Map.class)){
        	Map<?,?> tmp = JSON.parseObject(value, Map.class);
        	field.set(obj, tmp);
        }else{
        	field.set(obj, JSON.parseObject(value, fieldClazz));
        }
		field.setAccessible(false);
	}

	public static boolean isPrimitive(Class<?> clazz) {
        return clazz.isPrimitive() //
               || clazz == Boolean.class //
               || clazz == Character.class //
               || clazz == Byte.class //
               || clazz == Short.class //
               || clazz == Integer.class //
               || clazz == Long.class //
               || clazz == Float.class //
               || clazz == Double.class //
               || clazz == BigInteger.class //
               || clazz == BigDecimal.class //
               || clazz == String.class;
    }
}
