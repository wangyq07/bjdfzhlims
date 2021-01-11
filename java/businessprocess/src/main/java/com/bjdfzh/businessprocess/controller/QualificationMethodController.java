package com.bjdfzh.businessprocess.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController; 
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.QualificationMethodMapper;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.QualificationMethod;
import com.bjdfzh.businessprocess.entity.TestMethod;
import com.bjdfzh.businessprocess.entity.TestProject;
import com.bjdfzh.businessprocess.entity.TestStandard;
import com.bjdfzh.businessprocess.util.CacheGetBusinessModel;
import com.bjdfzh.businessprocess.util.Qualificationtemp;
import com.bjdfzh.util.JwtUtil;  
@RestController
@RequestMapping("qualificationmethods/")
@CrossOrigin
public class QualificationMethodController {
	@Autowired
	 QualificationMethodMapper qualificationmethodservice;
	@RequestMapping(value ="getqualificationmethods",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getqualificationmethods (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<QualificationMethod> quals=qualificationmethodservice.getqualificationmethods(Params.getIntValue("id"));
		 JSONObject retobject=new JSONObject();
		 retobject.put("list", quals);
		 retobject.put("total", quals.size());
		 retobject.put("query", Params);
	    return retobject; 
	}
	@RequestMapping(value ="getqualificationmethodprojecttest",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getqualificationmethodprojecttest (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		} 
		 List<QualificationMethod> quals=qualificationmethodservice.getqualificationmethodbytest(Params.getIntValue("testprojectid"),Params.getIntValue("standardid"));
		 JSONObject retobject=new JSONObject();
		 retobject.put("list", quals);
		 retobject.put("total", quals.size());
		 retobject.put("query", Params);
	    return retobject; 
	}
	 @RequestMapping(value ="getqualificationmethodbysearchkey"
			,method = {RequestMethod.POST,RequestMethod.GET}
	,produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getqualificationmethodbysearchkey(
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		List<QualificationMethod> retlist =qualificationmethodservice.getqualificationmethodsearch(String.format("%s%s%s", "%",Params.getString("project"),"%"),String.format("%s%s%s", "%",Params.getString("method"),"%"));
		 JSONObject retobject=new JSONObject();
		 retobject.put("list", retlist);
		 retobject.put("total", retlist.size());
		 retobject.put("query", Params);
	    return retobject; 
	}
	 
	 Qualificationtemp gettempquali(QualificationMethod qual,boolean isupdate)
	 {
		 JSONObject qualiparam=new JSONObject();
			qualiparam.put("parentprojectid",qual.getSecondid());
		    qualiparam.put("TestProject",qual.getTestproject());
			qualiparam.put("testprojectid",qual.getTestprojectid());
			qualiparam.put("standardid",qual.getStandardid());
			qualiparam.put("methodname",qual.getMethodname());
			qualiparam.put("standardname",qual.getStandardname()); 
			qualiparam.put("methodid",qual.getMethodid());
			qualiparam.put("price",qual.getPrice());
			qualiparam.put("companyid",1);
			qualiparam.put("qualifiedid", qual.getFirstid());
			qualiparam.put("id", qual.getQualificationid());
			Qualification qlf=new Qualification();
			TestStandard tstand=new TestStandard();
			TestMethod tm=new TestMethod();
			TestProject tp=new TestProject();
			CacheGetBusinessModel.setqualifm(tp, tm, qlf, tstand, qualiparam,isupdate);
			Qualificationtemp qt=new Qualificationtemp();
			qt.setQlf(qlf);qt.setTm(tm);qt.setTp(tp);qt.setTstand(tstand);
			return qt;
	 }
	 @Autowired
	 CacheGetBusinessModel cacheService;
	 @RequestMapping(value ="addqualificationmethod"
				    ,method = {RequestMethod.POST,RequestMethod.GET}
		            ,produces = "application/json;charset=UTF-8")
		@ResponseBody
	JSONObject  addqualificationmethod(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONObject retjson=new JSONObject();
		QualificationMethod qual= Params.toJavaObject(QualificationMethod.class);
		Qualificationtemp qt=gettempquali(qual,false); 
		cacheService.addQualification(qt.getTp(), qt.getTm(), qt.getTstand(), qt.getQlf()); 
		qual.setQualificationid(qt.getQlf().getId());
		List<QualificationMethod> quals=new ArrayList<QualificationMethod>();
		setquals(quals,qual);
		if(quals.size()>0)
		qualificationmethodservice.addqualificationmethod(quals);
		  retjson.put("Msg", "success");
		  retjson.put("query", Params);
		 return retjson;
	}
	 void setquals(List<QualificationMethod> quals,QualificationMethod qual)
	 {
		     
			
			if(qual.getRoleid() !=null&&StringUtils.isNotBlank(qual.getRoleid()) )
			{
			QualificationMethod tqual=new QualificationMethod(); 
			setQualmethod(qual,tqual,1);
			quals.add(tqual); 
			}
			if(qual.getUserid() !=null&&StringUtils.isNotBlank(qual.getUserid()) )
			{
			QualificationMethod tqual1=new QualificationMethod();
			setQualmethod(qual,tqual1,2);
			quals.add(tqual1);
			}
	 }
	void setQualmethod(QualificationMethod source,QualificationMethod tqual,int type)
	{
	 
		tqual.setDatatype(type);
		tqual.setQualificationid(source.getQualificationid());
		if(type==1)
		tqual.setTypeid(source.getRoleid());
		else
			tqual.setTypeid(source.getUserid());
	}
	@RequestMapping(value ="updatequalificationmethod"
		    ,method = {RequestMethod.POST,RequestMethod.GET}
            ,produces = "application/json;charset=UTF-8")
    @ResponseBody
	JSONObject updatequalificationmethod(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) 
		   throws Exception
	 { 		  
			if(!JwtUtil.isExpire(headers))
			{
				throw new Exception("认证已经过期，请登录");
			}
			JSONObject retjson=new JSONObject();
			List<QualificationMethod> quals= Params.getJSONArray("updatelist").toJavaList(QualificationMethod.class);
			//List<Integer> qualificaiotnids=quals.stream().map(QualificationMethod::getQualificationid).collect(Collectors.toList());
		   StringBuilder sb=new StringBuilder();
		   List<Qualificationtemp> tqs=new ArrayList<>();
		   List<QualificationMethod> updatequals=new ArrayList<>();
		   for( int i=0;i<quals.size();i++)
		   {
			   if(i!=0)
			   {
				   sb.append(",");
			   }
			   sb.append(quals.get(i).getQualificationid());
			   tqs.add(this.gettempquali(quals.get(i),true));
			   setquals(updatequals,quals.get(i));
		   }
		   cacheService.updateQualifications(tqs);
		   if(sb.length()>0)
		   {
		   qualificationmethodservice.deletequalificationmethods(sb.toString());
		   if(updatequals.size()>0)
		   qualificationmethodservice.addqualificationmethod(updatequals);
		   } 
			retjson.put("Msg", "success");
		  retjson.put("query", Params);
		 return retjson;
  }
	@RequestMapping(value ="{Params}",method = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getqualificationsbyid(
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers
		    ,HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		  
		if(request.getMethod().contentEquals("GET") )
	   return JSONObject.parseObject(JSONObject.toJSONString(  qualificationmethodservice.getqualificationmethodbyid(Params))) ;
		else if(request.getMethod().contentEquals("DELETE"))
		{
			QualificationMethod qual=	JSONObject.parseObject(Params,QualificationMethod.class);
			qualificationmethodservice.deletequalificationmethod( qual.getQualificationid() ); 
			qual.setRoleid(null);
			qual.setUserid(null);
			return JSONObject.parseObject(JSONObject.toJSONString((qual)));
		}
		return new JSONObject();
	}
}
