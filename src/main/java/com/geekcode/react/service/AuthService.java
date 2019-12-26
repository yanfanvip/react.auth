package com.geekcode.react.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.geekcode.react.dao.T_auth_Repository;
import com.geekcode.react.dao.T_role_auth_Repository;
import com.geekcode.react.exceptions.CustomizeRuntimeException;
import com.geekcode.react.model.common.T_auth;
import com.geekcode.react.model.res.AuthTree;

@Service
public class AuthService {
	static Logger log = Logger.getLogger(AuthService.class);

	@Autowired
	T_auth_Repository auth_dao;
	@Autowired
	T_role_auth_Repository role_auth_dao;
	
	//初始化权限
	@PostConstruct
	@Transactional
	public void init() {
		T_auth auth = new T_auth();
		auth.setId(1L);
		auth.setName("全局权限");
		auth.setAuth("index");
		auth_dao.save(auth);
	}
	
	public T_auth save(T_auth auth) {
		return auth_dao.save(auth);
	}
	
	public void delete(Long id) {
		long count = role_auth_dao.countByAuth(id);
		if(count > 0) { throw new CustomizeRuntimeException("当前权限已被分配，请去除分配后删除"); }
		auth_dao.deleteById(id);
	}
	
	public AuthTree tree() {
		List<T_auth> all = auth_dao.findAll();
		Map<Long, AuthTree> treeMap = new HashMap<Long, AuthTree>();
		for (T_auth t_auth : all) {
			treeMap.put(t_auth.getId(), new AuthTree(t_auth));
		}
		AuthTree root = null;
		for (AuthTree t : treeMap.values()) {
			if(t.getPid() == null) {
				root = t;
			}else {
				AuthTree parent = treeMap.get(t.getPid());
				if(parent == null) { 
					log.warn("无法找到权限[" + t.getName() + "]的父节点");
					continue;
				}
				parent.addChildren(t);
			}
		}
		return root;
	}

	public T_auth get(Long id) {
		return auth_dao.findById(id).get();
	}
}
