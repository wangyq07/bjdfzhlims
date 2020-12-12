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
import com.bjdfzh.userprivilage.dao.OrganizationMapper;
import com.bjdfzh.userprivilage.dao.RoleMapper;
import com.bjdfzh.userprivilage.entity.Organization;
import com.bjdfzh.userprivilage.entity.Role;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class RoleController {
	 @Autowired
     private RoleMapper roleService;
	 @Autowired
	 private OrganizationMapper organizationservice;
	@RequestMapping(value ="roles/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String GetRoles (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
		String OrgId=null;
		 JSONObject paramobj=null;
		 
		 if(Params !=null&&!Params.equals(""))
		 {
			 paramobj=JSONObject.parseObject(Params);
		 }
		 JSONArray filter=paramobj.getJSONArray("filter");
		 if(filter.size()>0)
		 {
			 JSONObject jo= filter.getJSONObject(0);
			 if(jo !=null)
				 OrgId=jo.getString("value");
		 }
		 List<Role> orgs=null;
				 if(OrgId==null||OrgId.equals(""))
				    orgs=roleService.getroles ();
				 else 
					  orgs=roleService.getrolebyorg(OrgId);
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(orgs),orgs.size(),Params);
   }
	@RequestMapping(value="roles/{Params}"
			,method= {RequestMethod.GET,RequestMethod.DELETE}
	         ,produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String RoleOperation(
			@PathVariable(name="Params") String Params,
			 @RequestHeader(name="Authorization") String headers,
			  HttpServletRequest request
			) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONObject jo=new JSONObject();
		 if(request.getMethod().contentEquals("GET"))
		 {
		 Role role=roleService.getrole(Params);
		 Organization org=	organizationservice.getone(role.getOrganizationId());
		    jo=JSONObject.parseObject(JSONObject.toJSONString(role));
		 jo.put("organization", org);
		 return jo.toJSONString();
		 }
		 else if(request.getMethod().contentEquals("DELETE"))
		 { 
			 roleService.deleteroleuser(Params);
			 roleService.deleteroleaction(Params);
			 roleService.deleterole(Params);
			 jo.put("MSG",  "删除成功！");
			 return jo.toJSONString();
		 }
		 
		 jo.put("MSG",  "没有服务");
		 return jo.toJSONString();
		 
	}
	@RequestMapping(value ="roles/10/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String GetRolesByorg (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		String OrgId=null;
		 JSONObject paramobj=null;
		 if(Params !=null&&!Params.equals(""))
		 {
			 paramobj=JSONObject.parseObject(Params);
		 }
		 JSONArray filter=paramobj.getJSONArray("filter");
		 if(filter!=null&&filter.size()>0)
		 {
			 JSONObject jo= filter.getJSONObject(0);
			 if(jo !=null)
				 OrgId=jo.getString("value");
		 }
		 List<Role> orgs=null;
				 if(OrgId==null||OrgId.equals(""))
				    orgs=roleService.getroles ();
				 else 
					  orgs=roleService.getrolebyorg(OrgId);
		
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(orgs),orgs.size(),Params);
   }
	@RequestMapping(value ="roles",method =  {RequestMethod.PUT,RequestMethod.POST},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject updateRole (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
		    ) throws Exception { 
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		String id=Params.getString("id"),name=Params.getString("name");
		JSONObject jo=Params.getJSONObject("organization");
		if(jo !=null&&id!=null&&name!=null)
		{
			String orgid=jo.getString("id");
		if(orgid !=null&&!orgid.contentEquals(""))
		{
		 Role role=new Role();
		 role.setId(id);
		 role.setName(name);
		 role.setOrganizationId(orgid);
		 if(request.getMethod().contentEquals("PUT"))
		 {
			 roleService.updaterole( role);
		 }
		 else if(request.getMethod().contentEquals("POST"))
		 {
			 roleService.addrole(role);
		 }
		}
		}
	    return Params;
	}
}
