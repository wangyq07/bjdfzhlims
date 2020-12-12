package com.bjdfzh.businessprocess.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.CustomerMapper;
import com.bjdfzh.businessprocess.dao.QualificationMapper;
import com.bjdfzh.businessprocess.dao.TestMethodMapper;
import com.bjdfzh.businessprocess.dao.TestProjectMapper;
import com.bjdfzh.businessprocess.entity.Customer;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.TestMethod;
import com.bjdfzh.businessprocess.entity.TestProject;
import com.bjdfzh.businessprocess.util.CacheGetBusinessModel;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class TestProjectController {
	@Autowired
	CacheGetBusinessModel getmodelService;

	@RequestMapping(value ="testprojects/9007199254740991/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String GetTestProjects (
			@RequestBody(required = false) String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 List<TestProject> projects=getmodelService.getAllTestProjects();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(projects),projects.size(),Params);
  }
	@RequestMapping(value ="testprojects/getalltestProject",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<TestProject> GetallTestProjects (
			@RequestBody(required = false) String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 List<TestProject> projects=getmodelService.getAllTestProjects();
		 if(projects==null)
			 projects=new ArrayList<TestProject>();
	    return   projects;
  }
	@RequestMapping(value ="testprojects/getprojectsbylevel",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<TestProject> getprojectsbylevel (
			@RequestBody(required = false) JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 List<TestProject> projects=getmodelService.gettestprojectbylevel(Params.getIntValue("level"));
		 if(projects==null)
			 projects=new ArrayList<TestProject>();
	    return   projects;
  }
	@RequestMapping(value ="testprojects/getprojectsbypid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<TestProject> getprojectsbypid (
			@RequestBody(required = false) JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		String pid=Params.getString("pid");
		 List<TestProject> projects=getmodelService.gettestprojectbypid(pid==null?"root":pid, false);
		 if(projects==null)
			 projects=new ArrayList<TestProject>();
	    return   projects;
  }
	@Autowired
	  TestProjectMapper tpmService;
	@Autowired
	  TestMethodMapper tmService;
	@Autowired
	  QualificationMapper qmService;
	@RequestMapping(value ="testprojects/savequalification",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
 public Qualification	savequalification(@RequestBody(required = false) JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
	  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 TestProject tp=new TestProject();
		 tp.setLabel(Params.getString("TestProject"));
		 tp.setPid(Params.getString("parentprojectid"));
		 tp.setLevel(3);
		 tpmService.addtestProject(tp);
		  TestMethod tm=new TestMethod();
		   tm.setMethodname(Params.getString("methodname"));
		   tmService.addTestMethod(tm);
		   Qualification qlf=new Qualification();
		   qlf.setMethodid(tm.getId()); 
		   qlf.setCompanyid(Params.getIntValue("companyid"));
		   qlf.setTestproject(tp.getLabel());
		   qlf.setMethodname(tm.getMethodname());
		   qlf.setTestprojectid(Integer.parseInt(tp.getId()));
		   qlf.setPrice(Params.getDoubleValue("price"));
		   qmService.addqualification(qlf);
	    return   qlf;
}
}
