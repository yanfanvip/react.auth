package com.geekcode.react.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.geekcode.react.dao.T_manager_Repository;
import com.geekcode.react.dao.T_role_Repository;
import com.geekcode.react.dao.T_role_auth_Repository;
import com.geekcode.react.exceptions.CustomizeRuntimeException;
import com.geekcode.react.model.common.T_role;
import com.geekcode.react.model.common.T_role_auth;
import com.geekcode.react.model.req.Form_AddRole;
import com.geekcode.react.util.ObjectUtil;

@Service
public class RoleService {
	static Logger log = Logger.getLogger(RoleService.class);

	@Autowired
	T_role_Repository role_dao;
	@Autowired
	T_role_auth_Repository role_auth_dao;
	@Autowired
	T_manager_Repository manager_dao;
	
	@Transactional
	public T_role save(Form_AddRole form) throws Exception {
		T_role role = ObjectUtil.convert(form, T_role.class);
		role = role_dao.save(role);
		List<T_role_auth> ras = new ArrayList<T_role_auth>();
		for (Long auth : form.getAuths()) {
			T_role_auth ra = new T_role_auth();
			ra.setAuth(auth);
			ra.setRole(role.getId());
			ras.add(ra);
		}
		role_auth_dao.deleteByRole(role.getId());
		role_auth_dao.saveAll(ras);
		return form;
	}
	
	@Transactional
	public void delete(Long id) {
		long count = manager_dao.countByRole(id);
		if(count > 0) { throw new CustomizeRuntimeException("当前角色已分配给用户，请去除分配后删除"); }
		role_dao.deleteById(id);
		role_auth_dao.deleteByRole(id);
	}

	public Form_AddRole getDetail(Long id) throws Exception {
		T_role role = role_dao.findById(id).get();
		if(role == null){ return null; }
		Form_AddRole form = ObjectUtil.convert(role, Form_AddRole.class);
		List<Long> auths = role_auth_dao.findAuthByRole(id);
		List<String> authNames = role_auth_dao.findAuthNamesByRole(id);
		form.setAuths(auths);
		form.setAuthNames(authNames);
		return form;
	}
	
	public T_role get(Long id) {
		return role_dao.findById(id).get();
	}

	public List<T_role> all() {
		return role_dao.findAll();
	}
}
