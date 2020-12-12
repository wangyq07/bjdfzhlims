package com.bjdfzh.flow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.flow.dao.RoleAuditSettingMapper;
import com.bjdfzh.flow.entity.RoleAuditSetting;
 

@RestController
@RequestMapping("roleauditsetting")
@CrossOrigin
public class RoleAuditSettingController {
	@Autowired
	RoleAuditSettingMapper auditSevice;
	@RequestMapping(value ="getsettings",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	List<RoleAuditSetting> getsettings(@RequestBody(required = false) JSONObject jb)
	{
		return auditSevice.getroleauditsetting(); 
	}
	 
	@RequestMapping(value ="getsettingbyid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleAuditSetting getsettingbyid(@RequestBody(required = false) JSONObject jb
		    ,@RequestHeader(name="Authorization") String headers )
	{
		return  auditSevice.getroleauditsettingbyid(jb.getString("roleid"));
	}
	@RequestMapping(value ="addsetting",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleAuditSetting addRoleAuditSetting(@RequestBody(required = false) RoleAuditSetting jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		jb.setLabel(jb.getRole().getName());
		 this.auditSevice.addroleauditsetting(jb);
		return jb;
	}
	@RequestMapping(value ="getauditvariable",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getauditvariable(@RequestBody(required = false) JSONObject jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		RoleAuditSetting rs=null;
		JSONArray ja=jb.getJSONArray("roles");
		if(ja !=null&&ja.size()>0)
		{
			for(int i=0;i<ja.size();i++)
			{
				rs=auditSevice.getroleauditsettingbyid(ja.getJSONObject(i).getString("id"));
			   if(rs !=null)
				   break;
			}
			if(rs !=null)
			{
			JSONObject retjb= JSONObject.parseObject(String.format(rs.getAuditjson(), jb.getIntValue("audit"),String.format("'%s'", jb.getString("addvice"))));
			return retjb;
			}
		}
		 
			return null;
	}
	@RequestMapping(value ="updatesetting",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleAuditSetting updatesetting(@RequestBody(required = false) RoleAuditSetting jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		jb.setLabel(jb.getRole().getName());
		auditSevice.updateroleauditsetting(jb);
		return jb;
	}
	@RequestMapping(value ="deletesetting",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleAuditSetting deletesetting(@RequestBody(required = false) RoleAuditSetting jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		jb.setLabel(jb.getRole().getName());
		auditSevice.deleteroleauditsetting(jb.getRole().getId());
		return jb;
	}
}
