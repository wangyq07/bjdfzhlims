package com.bjdfzh.userprivilage.controller;

import java.util.ArrayList;
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
import com.bjdfzh.userprivilage.dao.ActionMapper;
import com.bjdfzh.userprivilage.entity.Action;
import com.bjdfzh.userprivilage.entity.RelationId;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class ActionController {
	@Autowired
	private ActionMapper actionService;
	@RequestMapping(value="actions",method=RequestMethod.POST,produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addAction(
			@RequestBody JSONObject Params
			,@RequestHeader(name="Authorization") String headers
			) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		actionService.addaction(Params.toJavaObject(Action.class));
		return null;
	}
	@RequestMapping(value="actions/{Params}",method= {RequestMethod.DELETE,RequestMethod.GET},produces="application/json;charset=UTF-8")
	@ResponseBody
	public String deleteAction(
			@PathVariable(name="Params",required=false) String Params,
			@RequestHeader(name="Authorization") String headers
			,HttpServletRequest httpServletRequest 
			) throws Exception
			
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		if(httpServletRequest.getMethod().contentEquals("DELETE"))
		actionService.deleteaction(Params);
		if(httpServletRequest.getMethod().contentEquals("GET"))
		{
			return JSONObject.toJSONString(actionService.getaction(Params));
		}
		return null;
	} 
	@RequestMapping(value ="actions/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getActions (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
		String MenuId=null;
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
				 MenuId=jo.getString("value");
		 }
		 List<Action> actions=null;
				 if(MenuId==null||MenuId.equals(""))
					 actions=actionService.getactions();
				 else 
					 actions=actionService.getactionbymenu(MenuId);
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(actions),actions.size(),Params);
   }
	@RequestMapping(value ="roles/actions/{roleId}/{menuId}",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String RolesActions (
			@PathVariable(name = "roleId", required = false) String roleId,
			@PathVariable(name = "menuId", required = false) String menuId,
			@RequestBody(required=false) JSONObject paramActions,
		     @RequestHeader(name="Authorization") String headers
		     ,HttpServletRequest httpServletRequest  ) throws Exception {  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 List<Action> retactions=null;
				 if(menuId !=null&&!menuId.equals("")&&roleId !=null&&!roleId.equals("")) 
				 {	
					 if(httpServletRequest.getMethod().contentEquals("GET"))
					 {
					  retactions=actionService.getactionbymenurole(menuId,roleId); 
						if(retactions !=null)
							return JSONObject.toJSONString(retactions);
					 }
					 else if(httpServletRequest.getMethod().contains("PUT"))
					 {
						 JSONArray actions=paramActions.getJSONArray("actions");
						 actionService.deleteroleactionmap(menuId,roleId);
						 if(actions.size()>0)
						 {
							 List<RelationId> rids=new ArrayList<RelationId>();
							 for(int i=0;i<actions.size();i++)
							 {
								JSONObject jo= actions.getJSONObject(i);
								rids.add(new RelationId(roleId,jo.getString("id")));
							 }
							 actionService.addroleactionmap(rids);
							 return null;
						 }
					 }
					 else if(httpServletRequest.getMethod().contains("DELETE"))
					 {   
						 actionService.deleteroleactionmap(menuId,roleId); 
						 return null;
					 }
				 }
	   throw new Exception("没有找到服务"); 
   }
}
