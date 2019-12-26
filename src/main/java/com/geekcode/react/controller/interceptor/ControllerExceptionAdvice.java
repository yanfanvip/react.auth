package com.geekcode.react.controller.interceptor;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.geekcode.react.exceptions.CustomizeRuntimeException;

@ControllerAdvice 
public class ControllerExceptionAdvice {
	static Logger log = Logger.getLogger(ControllerExceptionAdvice.class);

	@ExceptionHandler(value = CustomizeRuntimeException.class)
    public Exception handlerCustomizeRuntimeException(Exception e){
    	log.error("api error：" + e.getMessage() + " : " + e.getStackTrace()[0].toString());
    	return e;
    }
	
    @ExceptionHandler(value = Exception.class)
    public Exception handlerException(Exception e){
    	log.error("api error", e);
    	return e;
    }
   
}
