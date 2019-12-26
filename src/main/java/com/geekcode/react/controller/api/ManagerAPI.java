package com.geekcode.react.controller.api;

import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.geekcode.react.controller.BaseAPI;
import com.geekcode.react.controller.interceptor.Auth;
import com.geekcode.react.exceptions.CustomizeRuntimeException;
import com.geekcode.react.model.Response;
import com.geekcode.react.model.common.T_manager;
import com.geekcode.react.model.req.Form_manager_login;
import com.geekcode.react.model.res.ManagerDetail;
import com.geekcode.react.model.res.ManagerRole;
import com.geekcode.react.service.ManagerService;
import com.geekcode.react.util.CookieUtil;
import com.geekcode.react.util.SessionUtil;
import com.geekcode.react.util.TokenUtil;
import com.geekcode.react.util.VerificationCodeUtil;
import com.geekcode.react.util.VerifyCodeUtil;

@RestController
@RequestMapping("/api/manager")
public class ManagerAPI extends BaseAPI{

	@Autowired
	ManagerService managerService;
	
	@GetMapping("/verificationcode")
	public void verificationcode(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	String code = VerifyCodeUtil.next(4);
    	VerificationCodeUtil.set(SessionUtil.getSessionId(request), code);
    	String base64 = VerifyCodeUtil.imageToBase64(120, 40, code);
    	
    	response.setHeader("Pragma", "no-cache");
    	response.setHeader("Cache-Control", "no-cache");
    	response.setDateHeader("Expires", -1);
    	response.setContentType("image/jpeg");
    	
    	try(OutputStream write = response.getOutputStream()){
    		VerifyCodeUtil.write(write, base64);
    	}
    }
	
	@PostMapping("/login")
    public Response<ManagerDetail> login(@Valid @RequestBody Form_manager_login form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	String code = VerificationCodeUtil.get(SessionUtil.getSessionId(request));
    	VerificationCodeUtil.clear(SessionUtil.getSessionId(request));
    	if(code == null || code.equals("")){ throw new CustomizeRuntimeException("验证码已失效"); }
    	if(form.getCode() == null || form.getCode().equals("")){ throw new CustomizeRuntimeException("请填写验证码"); }
    	if(!code.toLowerCase().equals(form.getCode().toLowerCase())){ throw new CustomizeRuntimeException("验证码错误"); }
    	ManagerDetail manager = managerService.login(form);
    	if(manager == null){ throw new CustomizeRuntimeException("登录失败"); }
    	CookieUtil.addCookie(response, "TOKEN", TokenUtil.getToken(manager.getUsername()));
		CookieUtil.addCookie(response, "AUTH", TokenUtil.getToken(manager.getId() + ":" + manager.getPassword()) );
    	manager.setPassword("");
    	SessionUtil.setSession(request, "MANAGER", manager);
        return SUCCESS(manager);
    }
	
	@GetMapping("/info")
	@Auth
	public Response<ManagerDetail> info(HttpServletRequest request, HttpServletResponse response) {
		ManagerDetail manager = SessionUtil.getSession(request, "MANAGER");
		return SUCCESS(manager);
	}
	
	@GetMapping("/page")
	@Auth("/manager/index")
	public Response<Page<ManagerRole>> page(@RequestParam int page, 
    		@RequestParam(defaultValue="10", required=false) int pageSize) {
		return SUCCESS(managerService.page(page, pageSize));
	}
	
	@GetMapping("/{id}")
	@Auth("/manager/index")
	public Response<T_manager> detail(@PathVariable Long id) {
		T_manager manager = managerService.get(id);
		manager.setPassword("");
		return SUCCESS(manager);
	}
	
	@PostMapping("/save")
	@Auth("/manager/add")
	public Response<T_manager> save(@RequestBody T_manager data) {
		return SUCCESS(managerService.save(data));
	}
	
	@PostMapping("/delete/{id}")
	@Auth("/manager/delete")
	public Response<Void> delete(@PathVariable Long id) {
		managerService.delete(id);
		return SUCCESS();
	}
}
