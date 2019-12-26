package com.geekcode.react.exceptions;

public class CustomizeRuntimeException extends RuntimeException {
	private static final long serialVersionUID = -4157661431466193384L;

	public CustomizeRuntimeException(String message) {
		super(message);
	}

	public CustomizeRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

	public CustomizeRuntimeException(Throwable cause) {
		super(cause);
	}

}
