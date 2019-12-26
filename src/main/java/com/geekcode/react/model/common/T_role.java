package com.geekcode.react.model.common;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name="t_role")
public class T_role {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator="t_role")//自增
	@TableGenerator(name="t_role")
	Long id;//主键
	
	@Column(length=255, nullable=false)
	String name;//角色名称
	
	@Column(length=500, nullable=true)
	String description;//描述

	
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
