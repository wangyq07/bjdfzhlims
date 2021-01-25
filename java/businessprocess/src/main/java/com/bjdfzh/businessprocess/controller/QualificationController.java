package com.bjdfzh.businessprocess.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
import com.bjdfzh.businessprocess.dao.CommonTypeMapper;
import com.bjdfzh.businessprocess.dao.QualificationCompanyMapper;
import com.bjdfzh.businessprocess.dao.QualificationMapper;
import com.bjdfzh.businessprocess.dao.TestMethodMapper;
import com.bjdfzh.businessprocess.dao.TestProjectMapper;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.QualificationCompany;
import com.bjdfzh.businessprocess.entity.ServiceType;
import com.bjdfzh.businessprocess.entity.TestMethod;
import com.bjdfzh.businessprocess.entity.TestProject;
import com.bjdfzh.businessprocess.entity.TestStandard;
import com.bjdfzh.businessprocess.util.CacheGetBusinessModel;
import com.bjdfzh.userprivilage.entity.CommonType;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class QualificationController {
	//http://localhost:3001/qualifications/20/1
	@Autowired
	 QualificationMapper qualificationservice;
	@Autowired
	 QualificationCompanyMapper companyservice;
	@Autowired
	TestProjectMapper testProjectService;
	@Autowired
	CommonTypeMapper commonservice;
	@RequestMapping(value ="qualificationcompanys/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getQualificationCompany (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<QualificationCompany> quals=companyservice.getqualificationcompanys();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
		 
	}
	@RequestMapping(value ="qualificationsid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	List<Qualification> getqualificationsid(@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers ) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		List<Qualification> qualss= JSONObject.parseArray(Params, Qualification.class);
		List<Integer> ids=qualss.parallelStream().map(Qualification::getId).collect(Collectors.toList());
		StringBuilder sb=new StringBuilder();
		for(int i=0;i<ids.size();i++)
		{
			sb.append(String.format("%d", ids.get(i)));
			if(i !=ids.size()-1)
			{
				sb.append(",");
			}
		}
		String idds=sb.toString();
		 List<Qualification> quals=this.qualificationservice.getqualificationsbyids( idds);
		return quals;
	}
	@RequestMapping(value ="domains/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getSampleDomains (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getdomains();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);	 
	}
	
	@RequestMapping(value ="recievesampleforms/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getReceiveSampleForms (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getreceivesampleform();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	
	@RequestMapping(value ="servicetypes/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getServiceTypes (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<ServiceType> quals=commonservice.getservicetype();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	@RequestMapping(value ="seals/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getSeals (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getseals();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	@RequestMapping(value ="samplestatus",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getStatus (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getsamplestatus();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	@RequestMapping(value ="sampleprocess",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getProcess (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getsampleprocess();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	@RequestMapping(value ="samplestore",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getStore (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getsamplestore();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	@RequestMapping(value ="testtype",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getTestType (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<CommonType> quals=commonservice.getsampletesttype();
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		 
	}
	@RequestMapping(value ="qualifications/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getQualifications (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONObject jo=JSONObject.parseObject(Params);
		if(jo !=null)
		{
		JSONArray ja=jo.getJSONArray("filter");
		if(ja !=null&&ja.size()>0)
		{
			
		 List<Qualification> quals=qualificationservice.getqualifications(ja.getJSONObject(0).getIntValue("value"));
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		}
		}
		return String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", "[]",0,Params);
	}
	 @Autowired
	 CacheGetBusinessModel cmService ;
	@RequestMapping(value ="qualifications/getqualificationbysearchkey"
			,method = {RequestMethod.POST,RequestMethod.GET}
	,produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Qualification> getQualificationsbyseachkey (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		List<Qualification> retlist=new ArrayList<Qualification>();
	    String companyid=	Params.getString("companyid");
	    if(companyid.contentEquals("1"))
		  retlist=qualificationservice.getqualificationsearch(String.format("%s%s%s", "%",Params.getString("project"),"%") ,String.format("%s%s%s", "%",Params.getString("method"),"%"));
	    else
	    	retlist=qualificationservice.getqualificationsearchnon(companyid,String.format("%s%s%s", "%",Params.getString("project"),"%"));
	   return retlist;
	}
	@RequestMapping(value ="qualifications/{Params}",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getqualificationsbyid(
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		int id=Integer.parseInt(Params);
		if(request.getMethod().contentEquals("GET") )
	   return JSONObject.toJSONString(qualificationservice.getqualificationsbyid(id));
		else if(request.getMethod().contentEquals("DELETE"))
		{
			qualificationservice.deletequalification(id);
			return "{msg:'删除成功'}";
		}
		return "{msg:'失败'}";
	}
	@RequestMapping(value ="qualifications/10/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getQualificationst (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONObject jo=JSONObject.parseObject(Params);
		if(jo !=null)
		{
		JSONArray ja=jo.getJSONArray("filter");
		if(ja !=null&&ja.size()>0)
		{
			
		 List<Qualification> quals=qualificationservice.getqualifications(ja.getJSONObject(0).getIntValue("value"));
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		}
		}
		return String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", "[]",0,Params);
	}
	@RequestMapping(value ="qualifications/1000/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getQualificationsbycompany (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 
		JSONArray ja=Params.getJSONArray("filter");
		if(ja !=null&&ja.size()>1)
		{
			
		 List<Qualification> quals=qualificationservice.getqualificationsbycompany(ja.getJSONObject(0).getString("value"),ja.getJSONObject(1).getIntValue("value"));
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(quals),quals.size(),Params);
   
		}
		 
		return String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", "[]",0,Params);
	}
	@RequestMapping(value ="qualifications/getqualificaitonbycompanyidprojectid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject	getqualificaitonbycompanyidprojectid(@RequestBody(required = false) JSONObject Params
			    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
		  
			if(!JwtUtil.isExpire(headers))
			{
				throw new Exception("认证已经过期，请登录");
			}
			String companyname= Params.getString("companyid");
			String testproject=Params.getString("testprojectid"); 
		   Qualification q=qualificationservice.getqualificaitonbycompanyidprojectid(companyname, testproject); 
		  JSONObject jo=new  JSONObject();
		  jo.put("qualification", q);
		  jo.put("msg", "success");
		    return jo;
	}
	@RequestMapping(value ="qualifications/addexterqualification",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject	addexterqualification(@RequestBody(required = false) JSONObject Params
			    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
		  
			if(!JwtUtil.isExpire(headers))
			{
				throw new Exception("认证已经过期，请登录");
			}
			String companyname= Params.getString("companyname");
			String testproject=Params.getString("testpproject");
			String selid=Params.getString("sealid");
		   QualificationCompany company=	companyservice.getqualificationcompanybyname(companyname);
		   if(company ==null)
		   {
			   company=new QualificationCompany();
			   company.setLabel(companyname);
			   companyservice.addcompany(company);
		   }
		   TestProject ttp=testProjectService.gettestprojectbyname("外包项目",selid);
		   if(ttp==null)
		   {
			   ttp=new TestProject();
			   ttp.setLabel("外包项目");
			   ttp.setLevel(2);
			   ttp.setPid(selid);
			   testProjectService.addtestProject(ttp); 
		   }
		   TestProject tp=testProjectService.gettestprojectbyname(testproject,ttp.getId());
		   if(tp==null)
		   {
			   tp=new TestProject();
			   tp.setLabel(testproject);
			   tp.setLevel(3);
			   tp.setPid(ttp.getId());
			   testProjectService.addtestProject(tp); 
		   }
		   Qualification q=qualificationservice.getqualificaitonbycompanyidprojectid(String.format("%s", company.getId()) , tp.getId());
		   if(q==null)
		   {
			   q=new Qualification();
			   q.setCompanyid(company.getId());
			   q.setTestprojectid( tp.getId());
			   q.setTestproject(tp.getLabel());
			   q.setCompanyname(companyname); 
			   q.setFirstid(Integer.parseInt(selid));
			   qualificationservice.addqualification(q);
		   }
		  JSONObject jo=new  JSONObject();
		  jo.put("qualification", q);
		  jo.put("msg", "success");
		    return jo;
	}
 
		@RequestMapping(value ="qualifications/addqualification",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
		@ResponseBody
		public Qualification	addqualification(@RequestBody(required = false) JSONObject Params
				    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
			  
				if(!JwtUtil.isExpire(headers))
				{
					throw new Exception("认证已经过期，请登录");
				}
				TestProject tp=new TestProject();TestMethod tm=new TestMethod();Qualification qlf=new Qualification();
				TestStandard tstand=new TestStandard();
				CacheGetBusinessModel.setqualifm(tp,tm,qlf,tstand,Params,false);
				   cmService.addQualification(tp, tm,tstand, qlf);
			    return   qlf;
		}
		@RequestMapping(value ="qualifications/deletequalification",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
		@ResponseBody
		public JSONObject	deletequalification(@RequestBody(required = false) JSONObject Params
				    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
			  
				if(!JwtUtil.isExpire(headers))
				{
					throw new Exception("认证已经过期，请登录");
				}
				 int id=Params.getIntValue("qualificationid");
				   this.qualificationservice.deletequalification(id);
			    return   Params;
		}
		@RequestMapping(value ="qualifications/updatequalification",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
		@ResponseBody
	   public Qualification	updatequalification(@RequestBody(required = false) JSONObject Params
			    ,@RequestHeader(name="Authorization") String headers  ) throws Exception
		 {  
		  
			if(!JwtUtil.isExpire(headers))
			{
				throw new Exception("认证已经过期，请登录");
			}
			TestProject tp=new TestProject();TestMethod tm=new TestMethod();Qualification qlf=new Qualification();
			TestStandard tstand=new TestStandard();
			CacheGetBusinessModel.setqualifm(tp,tm,qlf,tstand,Params,true);
			   cmService.updateQualification(tp, tm,tstand, qlf);
		    return   qlf;
	    }
		@RequestMapping(value ="commontypes/getspecialdispatch",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
		@ResponseBody
	   public JSONObject	getspecialdispatch(@RequestBody(required = false) JSONObject Params
			    ,@RequestHeader(name="Authorization") String headers  ) throws Exception
		 {  
		  
			if(!JwtUtil.isExpire(headers))
			{
				throw new Exception("认证已经过期，请登录");
			} 
			JSONObject jo=new JSONObject();
			List<CommonType> list=commonservice.getspecialdispatchspecial(Params.getString("code"));
			jo.put("list", list);
			jo.put("total", list.size());
		    return   jo;
	    }
	
}
