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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.ContactMapper;
import com.bjdfzh.businessprocess.dao.ContactProjectMapper;
import com.bjdfzh.businessprocess.dao.ContactTestProjectMapper;
import com.bjdfzh.businessprocess.dao.ProjectNumberHandle;
import com.bjdfzh.businessprocess.dao.SampleMapper;
import com.bjdfzh.businessprocess.entity.Contact;
import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactSeal;
import com.bjdfzh.businessprocess.entity.ContactTestProject;
import com.bjdfzh.businessprocess.entity.Customer;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.Sample;
import com.bjdfzh.userprivilage.entity.CommonType;
import com.bjdfzh.util.EhCacheUtil;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class ContactController {
	@Autowired
	 ContactMapper contactservice; 
	@RequestMapping(value ="contacts/{Params}",method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject updatecontact(
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
		return  JSONObject.parseObject(JSONObject.toJSONString(contactservice.getcontactbyid(Params))); 
		else if(request.getMethod().contentEquals("DELETE"))
		{
			contactservice.deletecontactcustomer(Params); 
			contactservice.deletecontacttestproject(Params);
			contactservice.deletesamplebycontact(Params); 
			contactservice.deletecontactproject(Params);
			contactservice.deletecontact(Params);
			
		}
		return new JSONObject();
    }
	@RequestMapping(value ="contacts/{Params.size}/{Params.index}",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getContacts (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONArray ja=Params.getJSONArray("filter");
		JSONObject jo=new JSONObject();
		if(ja.size()>0)
		{
			//JSONArray jja=contactservice.getcontactjsonobject(ja.getJSONObject(0).getIntValue("value"));
		 List<Contact> contacts=contactservice.getcontactbycustomer(ja.getJSONObject(0).getIntValue("value"),ja.getJSONObject(1).getString("value"));
	      jo=EhCacheUtil.getRetObjects(Params, contacts);
  
		}
		else
		{
			jo.put("list", new ArrayList<Contact>());
			jo.put("total", 0);
			jo.put("query", Params);
		}
		
		return jo;
	}
	@Autowired
	ContactProjectMapper projectService;
	@Autowired
	SampleMapper sampleService;
	@Autowired
	ContactTestProjectMapper testProjectService;
	@RequestMapping(value ="contacts/addcontactproject",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public void addcontactproject(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		Contact contact= Params.getObject("contact", Contact.class);
		contactservice.addcontact(contact);
		contactservice.addcontactinfo(contact);
		List<ContactSeal> seals=new ArrayList<ContactSeal>();
		for(CommonType ct:contact.getSeal())
		{
			ContactSeal seal=new ContactSeal();
			seal.setContactid(contact.getId());
			seal.setSealid(ct.getId());
			seals.add(seal);
		}
		if(seals.size()>0)
		contactservice.addseals(seals);
		contactservice.addcustomers(contact.getContactcustomers());
		List<ContactProject> projects=Params.getJSONArray("projects").toJavaList(ContactProject.class);
		List<Sample> samples=new ArrayList<Sample>();
		List<ContactTestProject> testprojects=new ArrayList<ContactTestProject>();
		for(ContactProject project:projects)
		{
			for(Sample sample:project.getSamples())
			{
				samples.add(sample);
				for(ContactTestProject testproject:sample.getTestprojects())
				{
					testprojects.add(testproject);
				}
			}
		}
		if(projects.size()>0)
		{
			projectService.addcontactprojects(projects);
		}
		if(samples.size()>0)
		{
			sampleService.addsamples(samples);
		}
		if(testprojects.size()>0)
		{
			testProjectService.addcontactprojects(testprojects);
		}
	}
	@RequestMapping(value ="contacts/getcontactproject",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getcontactproject(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		return projectNumberHandle.getContactProject(Params.getString("contactid"));
	}
	//更新项目编号
	@Autowired
	ProjectNumberHandle projectNumberHandle;
	@RequestMapping(value ="contactprojects/updateprojectnumer",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject updateprojectnumer (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
	    String contactid=Params.getString("contactid");
	   JSONObject jb= projectNumberHandle.getContactProject(contactid);
	   Contact contact=jb.getObject("contact", Contact.class);
	   contact.setStandardfee(Params.getDoubleValue("standardfee"));
	   List<ContactProject> projects=jb.getJSONArray("projects").toJavaList(ContactProject.class);
		 contactservice.updatecontactstandardfee(contact); 
		 projectNumberHandle.HandleProject(contact, projects); 
		 JSONObject jo=new JSONObject();
		 jo.put("contact", contact);
		 jo.put("projects", projects);
		 return jo;
	 
	}
	@Autowired
	 ContactTestProjectMapper contestService;
	@RequestMapping(value ="contacts/updatecontacttest",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public void updatecontacttest(
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
	List<Sample> samples=	Params.getJSONArray("samples").toJavaList(Sample.class);
		 List<ContactTestProject> testprojects=new ArrayList<ContactTestProject>();
		 for(Sample sample:samples)
		 {
			 contestService.deleteprojectbysample(sample.getId());
			 contestService.addcontactprojects(sample.getTestprojects());
		 }
		 
	}
	@RequestMapping(value ="contacts/updatecontactinfo",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String updatecontactinfo(
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		Contact c=JSONObject.parseObject(Params, Contact.class);
		if(c !=null)
		{
			contactservice.deletecontactcustomer(c.getId());
			contactservice.addcustomers(c.getContactcustomers());
		 List<CommonType> seals=	c.getSeal();
		 if(seals.size()>0)
		 {
		 List<ContactSeal> transeals=new ArrayList<ContactSeal>();
		  for(CommonType ctype:seals)
		  {
			  ContactSeal seal=new ContactSeal();
			  seal.setContactid(c.getId());
			  seal.setSealid(ctype.getId());
			  transeals.add(seal);
		  }
		  contactservice.deletecontactseal(c.getId());
		  contactservice.addseals(transeals);
		 }
		 contactservice.deletecontactinfo(c.getId());
		 contactservice.addcontactinfo(c);
		}
		return Params;
	}
	@RequestMapping(value ="contacts",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject addContacts (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception { 
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		if(request.getMethod().contentEquals("POST"))
		{
			Contact cotact=JSONObject.toJavaObject(Params, Contact.class);
			  contactservice.addcontact(cotact); 
			  contactservice.addtempcustomer(cotact);
		}
		else if(request.getMethod().contentEquals("PUT"))
		{
			contactservice.updatecontact(JSONObject.toJavaObject(Params, Contact.class));
		}
	    return Params;
   }
}
