package com.geekcode.react.model.common;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name="t_auth")
public class T_auth {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator="t_auth")//自增
	@TableGenerator(name="t_auth")
	Long id;//主键
	
	@Column(length=50, nullable=true)
	Long pid;//上级ID
	
	@Column(length=255, nullable=false)
	String name;//权限名称
	
	@Column(length=50, nullable=false)
	String auth;//权限

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPid() {
		return pid;
	}

	public void setPid(Long pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}
}
