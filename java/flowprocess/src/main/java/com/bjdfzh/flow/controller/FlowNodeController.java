package com.bjdfzh.flow.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject; 
import com.bjdfzh.flow.dao.FlowNodeMapper;
import com.bjdfzh.flow.dao.ProjectContactCustomerMapper;
import com.bjdfzh.flow.entity.ProjectContactCustomer;
import com.bjdfzh.flow.entity.TaskNode;
import com.bjdfzh.flow.entity.TaskNodeRole;
import com.bjdfzh.userprivilage.entity.Role;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class FlowNodeController {
	 @Autowired
     private FlowNodeMapper nodeService;
	
	  RestTemplate rt=new RestTemplate();
	 @Autowired
	 private ProjectContactCustomerMapper pService;
	@RequestMapping(value ="flownodes/100/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject GetFlowNodes (
			@RequestBody(required = false) JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers 
			) throws Exception { 
		 
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONArray ja=Params.getJSONArray("filter");
		Map<String,Object> variable=new ConcurrentHashMap<String,Object>();
		 if(ja !=null&&ja.size()>0)
		{
			if(ja.getJSONObject(1).getString("value")==null)
				return null;
		 TaskNode  nodes=nodeService.getFlowNodeById(ja.getJSONObject(0).getString("value"),ja.getJSONObject(1).getString("value"));
	      if(nodes==null)
	    	  return null;
		 return JSONObject.parseObject(JSONObject.toJSONString(nodes));
		}
		return null; 
   }
	
	
	@RequestMapping(value ="contactprojectcustomer/getcontactbyproject",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public ProjectContactCustomer getContactCustmerByProject(
			@RequestBody JSONObject Params
			 ,@RequestHeader(name="Authorization") String headers
			) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		return pService.getitembyid(Params.getString("contactid"));
	}
	@RequestMapping(value ="flownodes/bymaxid",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject addFlowNodesbyMaxid (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		String maxflowid=Params.getString("maxid");
		String currentflowid=Params.getString("currentid");
		nodeService.addflownodebymaxnode(maxflowid, currentflowid);
		nodeService.addflowrolebymaxnode(maxflowid, currentflowid);
		nodeService.addflowrolespecialbymaxnode(maxflowid, currentflowid);
		return Params;
	}
	@RequestMapping(value ="flownodes",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject addFlowNodes (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		TaskNode node=JSONObject.toJavaObject(Params, TaskNode.class);
		if(request.getMethod().contentEquals("POST"))
		{
			nodeService.deleteflownode(node.getTasknodeid(),node.getFlowid());
			nodeService.deleteflowrole(node.getTasknodeid(),node.getFlowid());
			
			nodeService.addflownode(node);
			List<TaskNodeRole> roles=new ArrayList<TaskNodeRole>();
			 for(Role role:node.getRoles())
			{
				TaskNodeRole r=new TaskNodeRole();
				r.setTasknodeid(node.getTasknodeid());
				r.setRoleid(role.getId());
				r.setFlowid(node.getFlowid());
				roles.add(r);
			} 
			if(roles.size()>0)
			nodeService.addflowrole(roles);
			if(node.getSpecialdispatch().size()>0)
			{
				nodeService.deleteflowrolespecial(node.getTasknodeid(),node.getFlowid());
				nodeService.addflowrolespecial(node.getSpecialdispatch());
			}
		}
		 
	    return Params;
   } 
}
