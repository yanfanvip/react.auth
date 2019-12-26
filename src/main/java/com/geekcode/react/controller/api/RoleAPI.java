package com.geekcode.react.controller.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.geekcode.react.controller.BaseAPI;
import com.geekcode.react.model.Response;
import com.geekcode.react.model.common.T_role;
import com.geekcode.react.model.req.Form_AddRole;
import com.geekcode.react.service.RoleService;

@RestController
@RequestMapping("/api/role")
public class RoleAPI extends BaseAPI{
	@Autowired
	RoleService roleService;
	
	@GetMapping("/all")
    public Response<List<T_role>> all() throws Exception {
        return SUCCESS(roleService.all());
    }

	@GetMapping("/{id}")
	public Response<Form_AddRole> detail(@PathVariable Long id) throws Exception {
		return SUCCESS(roleService.getDetail(id));
	}
	
	@PostMapping("/save")
	public Response<T_role> save(@RequestBody Form_AddRole form) throws Exception {
		return SUCCESS(roleService.save(form));
	}
	
	@PostMapping("/delete/{id}")
	public Response<Void> delete(@PathVariable Long id) {
		roleService.delete(id);
		return SUCCESS();
	}
}
