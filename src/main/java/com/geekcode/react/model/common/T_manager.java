package com.geekcode.react.model.common;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name="t_manager")
public class T_manager {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator="t_manager")//自增
	@TableGenerator(name="t_manager")
	Long id;//主键
	
	@Column(length=50, nullable=false)
	String name;//角色名称
	
	@Column(length=50, nullable=false)
	String username;//角色账号
	
	@Column(length=50, nullable=false)
	String password;//密码
	
	@Column(nullable=false)
	Long role;

	@Column(length=50, nullable=false)
	String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getRole() {
		return role;
	}

	public void setRole(Long role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
