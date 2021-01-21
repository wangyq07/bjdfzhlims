package com.bjdfzh.userprivilage.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.userprivilage.dao.HandleAuth;
import com.bjdfzh.userprivilage.entity.AuthUser;
import com.bjdfzh.util.EhCacheUtil;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class AuthController {
   
	
	@Autowired
	private HandleAuth authService;
	
	@RequestMapping(value = "/auth/login", method = { RequestMethod.POST,
			RequestMethod.GET }, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject GetUser(@RequestBody JSONObject Params) throws Exception { 
		JSONObject json = authService.getauth(Params.getString("account"),Params.getString("password"));
		if(json.containsKey("MSG"))
		{
			throw new Exception(json.getString("MSG"));
		}
		return json;
	} 
	 
	@RequestMapping(value ="users",method = {RequestMethod.PUT,RequestMethod.DELETE,RequestMethod.POST},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject modifyUser(
			@RequestBody JSONObject Params 
			,@RequestHeader(name="Authorization") String headers
			,HttpServletRequest httpServletRequest
			) throws Exception
	{  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		try
		{
		AuthUser user=Params.toJavaObject(AuthUser.class);
		if(httpServletRequest.getMethod().equals("POST"))
		{
			authService.addUser(user);
		}
		else if(httpServletRequest.getMethod().equals("PUT"))
		{
			authService.updateUser(user);
		}
		 
		}
		catch(Exception ex)
		{
			throw new Exception(ex.getMessage());
		}
			//orgService.update(Params.toJavaObject(Organization.class));
		return null; //JSONObject.parseObject(JSONObject.toJSONString(service.getone(Params)));
    }
	@RequestMapping(value ="users/getauditcustomuservice",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getauditcustomuservice(  
		@RequestBody JSONObject Params
	    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
	String OrgId=null;
	if(Params==null)
	{
		throw new Exception("参数错误");
	}
	if(!JwtUtil.isExpire(headers))
	{
		throw new Exception("认证已经过期，请登录");
	}
	List<AuthUser> users= authService.getUserServices();
	JSONObject jo=new JSONObject();
	jo.put("list", users);
	jo.put("query", Params);
	jo.put("total", users.size());
    return   jo;
	}
	@RequestMapping(value ="users/{Params.size}/{Params.index}",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject GetUsers (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
		String OrgId=null;
		if(Params==null)
		{
			throw new Exception("参数错误");
		}
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 JSONArray filter=Params.getJSONArray("filter");
		 if(filter.size()>0)
		 {
			 JSONObject jo= filter.getJSONObject(0);
			 if(jo !=null)
				 OrgId=jo.getString("value");
		 }
		 JSONArray orgs=authService.getalluser(OrgId);  
	    return    EhCacheUtil.getRetObjects(Params, orgs);
   }
	@RequestMapping(value ="users/{Params}",method = {RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject GetUser(
			@PathVariable(name = "Params", required = false) String Params  
			,@RequestHeader(name="Authorization") String headers
			,HttpServletRequest httpServletRequest
			) throws Exception
	{  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		if(httpServletRequest.getMethod().equals("GET"))
		return  JSONObject.parseObject(JSONObject.toJSONString(authService.getalluserbyid(Params)));
		else if(httpServletRequest.getMethod().equals("DELETE"))
		{
			authService.deleteUser(Params);
			JSONObject jo=new JSONObject();
			jo.put("MSG", "删除成功");
			return jo;
		}
		return new JSONObject();
			
    }
	
	//beatheart
	@RequestMapping(value ="index/beatheart",method = {RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject setbeatheart( 
			@RequestHeader(name="Authorization",required=false) String headers
			) throws Exception
	{  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		return JSONObject.parseObject("{'msg':'认证成功'}");
		 
    }
	 
}
