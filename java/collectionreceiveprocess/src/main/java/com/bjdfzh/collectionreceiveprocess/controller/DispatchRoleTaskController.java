package com.bjdfzh.collectionreceiveprocess.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

 
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.collectionreceiveprocess.dao.DispatchRoleTaskMapper;
import com.bjdfzh.collectionreceiveprocess.entity.DispatchRoleTask;
import com.bjdfzh.collectionreceiveprocess.entity.RoleTestProject;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("roletestproject")
@CrossOrigin
@Qualifier
public class DispatchRoleTaskController {
	@Autowired
	DispatchRoleTaskMapper dispatchService;
	@RequestMapping(value ="getroletaskdispatchs",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
public List<RoleTestProject> getRoleTaskDispatch(
		@RequestBody JSONObject Params
	    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
			  
	if(!JwtUtil.isExpire(headers))
	{
		throw new Exception("认证已经过期，请登录");
	} 
	 
	return dispatchService.getroletaskdispatch(Params.getString("contactid"));
}
	@RequestMapping(value ="addroletaskdispatch",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
public  void addRoleTaskDispatch(
		@RequestBody JSONObject Params
	    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
			  
	if(!JwtUtil.isExpire(headers))
	{
		throw new Exception("认证已经过期，请登录");
	} 
	  List<RoleTestProject> rtps=Params.getJSONArray("roletestproect").toJavaList( RoleTestProject.class);
	  if(rtps.size()>0)
	  {
	  dispatchService.deletedispatchtask(Params.getString("contactid"));
	  //dispatchService.addtaskdispatchs(rtp.getTaskdispatchs());
	  List<DispatchRoleTask> tasks=new ArrayList<DispatchRoleTask>();
	    for(RoleTestProject rtp:rtps)
	    {
	    	tasks.addAll(rtp.getTaskdispatchs());
	    }
	    dispatchService.addtaskdispatchs(tasks);
	  }
	
}
	@RequestMapping(value ="deleteroletaskdispatch",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
public  void deleteRoleTaskDispatch(
		@RequestBody JSONObject Params
	    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
			  
	if(!JwtUtil.isExpire(headers))
	{
		throw new Exception("认证已经过期，请登录");
	} 
	 
	  dispatchService.deletedispatchtask(Params.getString("contactid"));
}
}
