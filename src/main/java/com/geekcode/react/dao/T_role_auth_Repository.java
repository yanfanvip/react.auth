package com.geekcode.react.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.geekcode.react.model.common.T_role_auth;
import com.geekcode.react.model.common.pk.T_role_auth_pk;

@Repository
public interface T_role_auth_Repository extends JpaRepository<T_role_auth, T_role_auth_pk> {

	List<T_role_auth> findByRole(Long role);
	List<T_role_auth> findByAuth(Long auth);
	
	@Query("select count(*) from T_role_auth where auth=:auth")
	long countByAuth(@Param("auth") Long auth);
	
	@Modifying
	@Query(value = "delete from T_role_auth where role=:role")
	void deleteByRole(@Param("role") Long role);
	
	@Query("select auth from T_role_auth where role=:role")
	List<Long> findAuthByRole(@Param("role") Long role);
	
	@Query("select a.auth from T_role_auth ra left join T_auth a on ra.auth = a.id where role=:role")
	List<String> findAuthNamesByRole(@Param("role") Long role);
	
}