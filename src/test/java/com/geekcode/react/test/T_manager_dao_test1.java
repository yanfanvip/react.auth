package com.geekcode.react.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.geekcode.react.AppMain;
import com.geekcode.react.dao.T_manager_Repository;
import com.geekcode.react.model.res.ManagerRole;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes=AppMain.class)
public class T_manager_dao_test1 {
	@Autowired
	T_manager_Repository manager_dao;

	@Test
	public void test1() throws Exception {
		Page<ManagerRole> page = manager_dao.findByPage(PageRequest.of(0, 10));
		page.forEach((d)->{
			System.out.println(JSON.toJSONString(d));
		});
	}
}
