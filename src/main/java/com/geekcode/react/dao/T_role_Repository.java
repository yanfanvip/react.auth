package com.geekcode.react.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.geekcode.react.model.common.T_role;

@Repository
public interface T_role_Repository extends JpaRepository<T_role,Long> {

}