package com.geekcode.react.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.geekcode.react.model.common.T_auth;

@Repository
public interface T_auth_Repository extends JpaRepository<T_auth,Long> {

}