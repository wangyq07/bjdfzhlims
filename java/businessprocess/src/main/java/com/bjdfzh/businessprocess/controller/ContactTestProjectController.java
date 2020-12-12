package com.bjdfzh.businessprocess.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.ContactTestProjectMapper;
import com.bjdfzh.businessprocess.entity.ContactTestProject;
import com.bjdfzh.util.JwtUtil;
@RestController
@RequestMapping("")
@CrossOrigin
public class ContactTestProjectController {
	@Autowired
	 ContactTestProjectMapper contacttestservice;
	@RequestMapping(value ="contacttests/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getContacttests (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONArray ja=Params.getJSONArray("filter");
		if(ja.size()>0)
		{
			
		 List<ContactTestProject> contacts=contacttestservice.getcontacttestprojects(ja.getJSONObject(0).getString("value"),ja.getJSONObject(1).getString("value"));
	     String retstr=   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(contacts),contacts.size(),Params);
           
	     return retstr; 
		}
		return String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", "[]",0,Params);
	}
	@RequestMapping(value ="contacttests",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addContactTestProjects (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers 
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 JSONObject jo=JSONObject.parseObject(Params);
		 if(jo !=null&&jo.containsKey("contacttests"))
		 {
		 
		 List<ContactTestProject> cons=jo.getJSONArray("contacttests").toJavaList(ContactTestProject.class);
		 
		  if(cons.size()>0)
		  {
			if(request.getMethod().contentEquals("POST"))
			{
			//contacttestservice.deleteproject(cons.get(0).getContactid(),cons.get(0).getSampleid());
		    //contacttestservice.addcontactproject(cons);
			}
			else if(request.getMethod().contentEquals("POST"))
			{
				//contacttestservice.deleteproject(cons.get(0).getContactid(), cons.get(0).getSampleid());
			}
		  }
		 }
	    return null;
  }
}
