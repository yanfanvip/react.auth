package com.geekcode.react.model.req;

import java.util.ArrayList;
import java.util.List;

import com.geekcode.react.model.common.T_role;

public class Form_AddRole extends T_role{

	List<Long> auths = new ArrayList<Long>();
	List<String> authNames = new ArrayList<String>();

	public List<Long> getAuths() {
		return auths;
	}

	public void setAuths(List<Long> auths) {
		this.auths = auths;
	}

	public List<String> getAuthNames() {
		return authNames;
	}

	public void setAuthNames(List<String> authNames) {
		this.authNames = authNames;
	}
}
