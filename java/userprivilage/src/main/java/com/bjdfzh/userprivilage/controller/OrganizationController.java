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

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.userprivilage.dao.OrganizationMapper;
import com.bjdfzh.userprivilage.entity.Organization;
import com.bjdfzh.util.EhCacheUtil;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class OrganizationController {
	@Autowired
	private OrganizationMapper orgService;
	@RequestMapping(value ="organization/{Params.size}/{Params.index}",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject GetOrgnization (
			@RequestBody(required = false) JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
		
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		List<Organization> orgs=orgService.getall(); 
		
		 return    EhCacheUtil.getRetObjects(Params, orgs);
    }
	@RequestMapping(value ="organization/{Params}",method = {RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject GetoOneOrgnization(
			@PathVariable(name = "Params", required = false) String Params  
			,@RequestHeader(name="Authorization") String headers
			,HttpServletRequest request
			) throws Exception
	{  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		if(request.getMethod().contentEquals("GET"))
		return  JSONObject.parseObject(JSONObject.toJSONString(orgService.getone(Params)));
		else if(request.getMethod().contentEquals("DELETE"))
		{
			orgService.updaterole(Params);
			orgService.deleteorguser(Params);
			orgService.deleteorg(Params);
		}
		return new JSONObject();
    }
	@RequestMapping(value ="organization",method = {RequestMethod.PUT,RequestMethod.POST},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject updateOrgnization(
			@RequestBody JSONObject Params 
			,@RequestHeader(name="Authorization") String headers
			,HttpServletRequest httpServletRequest
			) throws Exception
	{  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		    if(httpServletRequest.getMethod().contentEquals("PUT"))
			orgService.update(Params.toJavaObject(Organization.class));
		    if(httpServletRequest.getMethod().contentEquals("POST"))
				orgService.addorg(Params.toJavaObject(Organization.class));
		return Params; //JSONObject.parseObject(JSONObject.toJSONString(service.getone(Params)));
    }
}
