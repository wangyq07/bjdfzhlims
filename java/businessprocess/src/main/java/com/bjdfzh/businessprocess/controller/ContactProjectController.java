package com.bjdfzh.businessprocess.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
import com.bjdfzh.businessprocess.dao.ContactMapper;
import com.bjdfzh.businessprocess.dao.ContactProjectMapper;
import com.bjdfzh.businessprocess.dao.ContactTestProjectMapper;
 
import com.bjdfzh.businessprocess.dao.SampleMapper;
import com.bjdfzh.businessprocess.entity.Contact;
import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactTestProject; 
import com.bjdfzh.businessprocess.entity.Sample;
import com.bjdfzh.util.EhCacheUtil;
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
	
	@RequestMapping(value ="contactprojects/{Params.size}/{Params.index}",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getContactProjects (
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
			Map<String,Object>  map=new ConcurrentHashMap<>();
			map.put("contactid",ja.getJSONObject(0).getString("value"));
			map.put("start", (Params.getIntValue("index")-1)*Params.getIntValue("size"));
			map.put("end", (Params.getIntValue("index")-1)*Params.getIntValue("size")+Params.getIntValue("size")-1);
		    List<ContactProject> contacts=cprojectservice.getcontactprojects(map); 
			jo.put("list", contacts);
			jo.put("total", 0);
			jo.put("query", Params);
		}
		else
		{
			jo.put("list", new ArrayList<Contact>());
			jo.put("total", 0);
			jo.put("query", Params);
		}
		return jo;
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
	@Autowired
	  ContactMapper contactService;
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
		Map<String,Object>  map=new ConcurrentHashMap<>();
		map.put("contactid",Params.getString("id"));
		map.put("start",0);
		map.put("end", 20);
	    List<ContactProject> contacts=cprojectservice.getcontactprojects(map);  
		Contact cont=new Contact();
		cont.setId(Params.getString("id"));
		SimpleDateFormat  sf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 
		cont.setSigndate(sf.format(new Date()));
		cont.setContactstatus(1);
		contactService.updatecontact(cont);
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
	@RequestMapping(value="contactprojects/addcontactprojectinfos",method= {RequestMethod.POST})
	@ResponseBody
	JSONObject addcontactprojectinfos(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		List<ContactProject> contactinfos=Params.getJSONArray("projects").toJavaList(ContactProject.class);
		List<String> delids=new ArrayList<>();
		for(ContactProject cp:contactinfos)
		{
			delids.add(String.format("'%s'", cp.getId()));
		}
		String ids=String.join(",", delids);
		cprojectservice.deletesamplebyprojectinfos(ids);
		cprojectservice.addcontactprojectinfos(contactinfos);
		return Params;
	}
	
}
