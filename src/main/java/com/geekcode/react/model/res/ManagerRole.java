package com.geekcode.react.model.res;

import com.geekcode.react.model.common.T_manager;

public class ManagerRole extends T_manager{
	
	String role_name;
	
	public ManagerRole(Long id, String name, String username, Long role, String status, String role_name) throws Exception{
		this.setId(id);
		this.setName(name);
		this.setUsername(username);
		this.setRole(role);
		this.setStatus(status);
		this.setRole_name(role_name);
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
}
