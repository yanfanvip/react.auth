package com.geekcode.react.model.common.pk;

import java.io.Serializable;

public class T_role_auth_pk implements Serializable{
	private static final long serialVersionUID = 7410792701861876862L;
	
	Long role;
	Long auth;
	
	public Long getRole() {
		return role;
	}
	public void setRole(Long role) {
		this.role = role;
	}
	public Long getAuth() {
		return auth;
	}
	public void setAuth(Long auth) {
		this.auth = auth;
	}
}
