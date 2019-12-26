package com.geekcode.react.model.res;

import java.util.ArrayList;
import java.util.List;

import com.geekcode.react.model.common.T_auth;

public class AuthTree extends T_auth{
	
	String label;
	Long value;
	List<AuthTree> children = new ArrayList<AuthTree>();
	
	public AuthTree(T_auth auth){
		setId(auth.getId());
		setPid(auth.getPid());
		setName(auth.getName());
		setAuth(auth.getAuth());
		this.label = auth.getName();
		this.value = auth.getId();
	}

	public List<AuthTree> getChildren() {
		return children;
	}
	public void setChildren(List<AuthTree> children) {
		this.children = children;
	}
	public void addChildren(AuthTree tree) {
		this.children.add(tree);
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Long getValue() {
		return value;
	}
	public void setValue(Long value) {
		this.value = value;
	}
}
