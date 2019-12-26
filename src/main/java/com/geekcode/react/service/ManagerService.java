package com.geekcode.react.service;

import javax.transaction.Transactional;
import javax.validation.Valid;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.geekcode.react.dao.T_manager_Repository;
import com.geekcode.react.exceptions.CustomizeRuntimeException;
import com.geekcode.react.model.STATUS;
import com.geekcode.react.model.common.T_manager;
import com.geekcode.react.model.req.Form_AddRole;
import com.geekcode.react.model.req.Form_manager_login;
import com.geekcode.react.model.res.ManagerDetail;
import com.geekcode.react.model.res.ManagerRole;
import com.geekcode.react.util.ObjectUtil;

@Service
public class ManagerService {
	static Logger log = Logger.getLogger(ManagerService.class);

	@Autowired
	T_manager_Repository manager_dao;
	@Autowired
	RoleService roleService;
	
	@Transactional
	public T_manager save(T_manager manager) {
		T_manager oldManager = manager_dao.findByUsername(manager.getUsername());
		if(oldManager != null) {
			//已经存在用户名
			if(manager.getId() == null) { throw new CustomizeRuntimeException("当前用户名已被使用"); }
			//非当前用户
			if(!manager.getId().equals(oldManager.getId())) { throw new CustomizeRuntimeException("当前用户名已被使用"); }
			//当前用户修改信息
			if(manager.getPassword() == null) {
				manager.setPassword(oldManager.getPassword());
			}
		}
		return manager_dao.save(manager);
	}
	
	public void delete(Long id) {
		manager_dao.deleteById(id);
	}
	
	public T_manager get(Long id) {
		return manager_dao.findById(id).get();
	}
	
	public ManagerDetail getByUsername(String username) throws Exception {
		T_manager manager = manager_dao.findByUsername(username);
		if(manager == null) { return null; }
		Form_AddRole roleDetail = roleService.getDetail(manager.getRole());
		ManagerDetail detail = ObjectUtil.convert(manager, ManagerDetail.class);
		detail.setRole_detail(roleDetail);
		return detail;
	}
	
	public Page<ManagerRole> page(int pageIndex, int pageSize) {
		return manager_dao.findByPage(PageRequest.of(pageIndex, pageSize));
	}

	public ManagerDetail login(@Valid Form_manager_login form) throws Exception {
		T_manager manager = manager_dao.login(form.getUsername(), form.getPassword());
		if(manager == null) { throw new CustomizeRuntimeException("用户名或密码错误"); }
		STATUS status = STATUS.valueOf(manager.getStatus());
		switch (status) {
			case ENABLE:{ break; }
			case DISABLE:{ throw new CustomizeRuntimeException("账户已被禁用");}
		}
		Form_AddRole roleDetail = roleService.getDetail(manager.getRole());
		ManagerDetail detail = ObjectUtil.convert(manager, ManagerDetail.class);
		detail.setRole_detail(roleDetail);
		return detail;
	}
	
}
