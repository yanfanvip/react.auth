package com.geekcode.react.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.geekcode.react.controller.BaseAPI;
import com.geekcode.react.controller.interceptor.Auth;
import com.geekcode.react.model.Response;
import com.geekcode.react.model.common.T_auth;
import com.geekcode.react.model.res.AuthTree;
import com.geekcode.react.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthAPI extends BaseAPI{

	@Autowired
	AuthService authService;
	
	@GetMapping("/tree")
	@Auth({"/auth/index", "/role/index"})
	public Response<AuthTree> tree() {
		return SUCCESS(authService.tree());
	}
	
	@GetMapping("/{id}")
	@Auth({"/auth/index", "/role/index"})
	public Response<T_auth> detail(@PathVariable Long id) {
		return SUCCESS(authService.get(id));
	}
	
	@PostMapping("/save")
	@Auth("/auth/add")
	public Response<T_auth> save(@RequestBody T_auth data) {
		return SUCCESS(authService.save(data));
	}
	
	@PostMapping("/delete/{id}")
	@Auth("/auth/delete")
	public Response<Void> delete(@PathVariable Long id) {
		authService.delete(id);
		return SUCCESS();
	}
}
