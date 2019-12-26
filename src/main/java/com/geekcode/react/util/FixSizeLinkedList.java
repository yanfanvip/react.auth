package com.geekcode.react.util;

import java.util.LinkedList;

public class FixSizeLinkedList<T> extends LinkedList<T> {
	private static final long serialVersionUID = 3292612616231532364L;
	// 定义缓存的容量
	private int capacity;
 
	public FixSizeLinkedList(int capacity) {
		super();
		this.capacity = capacity;
	}
 
	public void addFirst(T e) {
		if (size() >= capacity) {
			super.removeLast();
		}
		super.addFirst(e);
	}
	
	public void addNotFull(T e) {
		if (size() < capacity) {
			super.add(e);
		}
	}
	
	public void addLast(T e) {
		if (size() >= capacity) {
			super.removeFirst();
		}
		super.add(e);
	}
	
	public boolean full() {
		return size() >= capacity;
	}
	
	public void narrow(){
		capacity--;
	}
 
}