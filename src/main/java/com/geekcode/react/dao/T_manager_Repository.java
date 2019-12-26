package com.geekcode.react.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.geekcode.react.model.common.T_manager;
import com.geekcode.react.model.res.ManagerRole;

@Repository
public interface T_manager_Repository extends JpaRepository<T_manager,Long> {

	@Query("select count(*) from T_manager where role=:role")
	long countByRole(@Param("role") Long role);

	T_manager findByUsername(@Param("username") String username);

	@Query("from T_manager where username=:username and password=:password")
	T_manager login(@Param("username") String username, @Param("password") String password);
	
	@Query(value = "select new com.geekcode.react.model.res.ManagerRole(m.id, m.name, m.username, m.role, m.status, r.name) "
			+ "from T_manager m left join T_role r on m.role=r.id", 
		countQuery = "select count(*) from T_manager")
	Page<ManagerRole> findByPage(Pageable pageable);
}