package com.geekcode.react.model.common;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.geekcode.react.model.common.pk.T_role_auth_pk;

@Entity
@Table(name="t_role_auth")
@IdClass(T_role_auth_pk.class)
public class T_role_auth {
	
	@Id
    Long role;//角色

    @Id
    Long auth;//权限

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

