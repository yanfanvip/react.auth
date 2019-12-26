package com.geekcode.react.model.res;

import com.geekcode.react.model.common.T_manager;
import com.geekcode.react.model.req.Form_AddRole;

public class ManagerDetail extends T_manager{

	Form_AddRole role_detail;

	public Form_AddRole getRole_detail() {
		return role_detail;
	}

	public void setRole_detail(Form_AddRole role_detail) {
		this.role_detail = role_detail;
	}
	
}
