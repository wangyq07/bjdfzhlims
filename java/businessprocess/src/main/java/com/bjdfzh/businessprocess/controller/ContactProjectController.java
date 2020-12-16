package com.bjdfzh.businessprocess.controller;

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
import com.bjdfzh.businessprocess.dao.ContactProjectMapper;
import com.bjdfzh.businessprocess.dao.ContactTestProjectMapper;
 
import com.bjdfzh.businessprocess.dao.SampleMapper; 
import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactTestProject; 
import com.bjdfzh.businessprocess.entity.Sample;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class ContactProjectController {
	
	@Autowired
	ContactProjectMapper cprojectservice;
	@Autowired
	ContactTestProjectMapper ctestprojectservice;
	@Autowired
	SampleMapper sampleservice; 
	@RequestMapping(value ="contactprojects/{Params}",method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject updateContactProject(
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
		return  JSONObject.parseObject(JSONObject.toJSONString(cprojectservice.getcontactproject(Params))); 
		else if(request.getMethod().contentEquals("DELETE"))
		{
			cprojectservice.deletecontacttestbyproject(Params);
			cprojectservice.deletesamplebyproject(Params);
			cprojectservice.deleteproject(Params); 
		}
		return new JSONObject();
    }
	
	@RequestMapping(value ="contactprojects/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getContactProjects (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONArray ja=Params.getJSONArray("filter");
		if(ja.size()>0)
		{  
		 List<ContactProject> contacts=cprojectservice.getcontactprojects(ja.getJSONObject(0).getString("value"));
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(contacts),contacts.size(),Params);
		}
		return String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", "[]",0,Params);
	}
	@RequestMapping(value ="contactprojects",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject addContactProject(
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 List<ContactProject> contacts=JSONArray.parseArray(Params.getJSONArray("projects").toJSONString(),ContactProject.class); 
		 List<Sample> samples=new ArrayList<Sample>();;
		 List<ContactTestProject> testprojects=new ArrayList<ContactTestProject>();
		 
		 if(contacts !=null&&request.getMethod().contentEquals("POST"))
		 { 	
			cprojectservice.addcontactprojects(contacts);
			
			for(ContactProject project:contacts)
			{
				setsamples(project,samples,testprojects);
			}
			sampleservice.addsamples(samples);
			ctestprojectservice.addcontactprojects(testprojects); 
		 }
		else if(contacts !=null&&request.getMethod().contentEquals("PUT"))
		{
			if(contacts.size()>0)
			{
			cprojectservice.updatecontactproject(contacts.get(0));
			setsamples(contacts.get(0),samples,testprojects); 
			String projectid=contacts.get(0).getId();
			cprojectservice.deletecontacttestbyproject(projectid);
			cprojectservice.deletesamplebyproject(projectid); 
			sampleservice.addsamples(samples); 
			ctestprojectservice.addcontactprojects(testprojects);
			}
		}
	    return Params;
   }
	//contactprojects/getprojects
	@RequestMapping(value ="contactprojects/getprojects",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	List<ContactProject>  getprojects(
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		List<ContactProject> contacts=cprojectservice.getcontactprojects(Params.getString("id"));
		return contacts;
	}
	private void setsamples(ContactProject project,List<Sample> samples
			          ,List<ContactTestProject> testprojects 
			           )
	{
		 
		for(Sample sam:project.getSamples())
		{
			sam.setProjectid(project.getId());
			samples.add(sam);
			for(ContactTestProject testproject:sam.getTestprojects())
			{
				testproject.setSampleid(sam.getId());
				testprojects.add(testproject);
			}
			 
		}
	}
}
