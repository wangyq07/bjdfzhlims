package com.bjdfzh.flow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.flow.cache.CacheGet;
import com.bjdfzh.flow.dao.RoleDiscountMapper;
import com.bjdfzh.flow.entity.RoleDiscount;

@RestController
@RequestMapping("rolediscount")
@CrossOrigin
public class RoleDiscountController {
	@Autowired
	CacheGet caservice;
	@Autowired
	RoleDiscountMapper rmservice;
	@RequestMapping(value ="getdiscounts",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	List<RoleDiscount> getdiscounts(@RequestBody(required = false) JSONObject jb)
	{
		return caservice.getallDiscount();
	}
	@RequestMapping(value ="getrolediscountvaluebyid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getrolediscountvaluebyid(@RequestBody(required = false) JSONObject jb
		    ,@RequestHeader(name="Authorization") String headers )
	{
		JSONObject jo=new JSONObject();
		jo.put("discount", caservice.getDiscountValueByDomainidRoleid(jb.getString("area"), jb.getJSONArray("roles")));
		return  jo;
	}
	@RequestMapping(value ="getrolediscountbyid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleDiscount getrolediscountbyid(@RequestBody(required = false) JSONObject jb
		    ,@RequestHeader(name="Authorization") String headers )
	{
		return  caservice.getDiscountByDomainidRoleid(jb.getString("domainid"), jb.getString("roleid"));
	}
	@RequestMapping(value ="addrolediscount",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleDiscount addrolediscount(@RequestBody(required = false) RoleDiscount jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		jb.setLabel(jb.getRole().getName());
		rmservice.addrolediscount(jb);
		return jb;
	}
	@RequestMapping(value ="updaterolediscount",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleDiscount updaterolediscount(@RequestBody(required = false) RoleDiscount jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		jb.setLabel(jb.getRole().getName());
		rmservice.updaterolediscount(jb);
		return jb;
	}
	@RequestMapping(value ="deleterolediscount",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
	@ResponseBody
	RoleDiscount deletediscount(@RequestBody(required = false) RoleDiscount jb
		    ,@RequestHeader(name="Authorization") String headers)
	{
		jb.setLabel(jb.getRole().getName());
		rmservice.deleteflownode(jb.getPid(),jb.getRole().getId());
		return jb;
	}
}
