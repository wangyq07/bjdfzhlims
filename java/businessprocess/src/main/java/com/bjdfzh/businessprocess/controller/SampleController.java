package com.bjdfzh.businessprocess.controller;

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
import com.bjdfzh.businessprocess.dao.ContactTestProjectMapper;
import com.bjdfzh.businessprocess.dao.SampleMapper;
import com.bjdfzh.businessprocess.entity.Contact;
import com.bjdfzh.businessprocess.entity.Sample;
import com.bjdfzh.util.JwtUtil;
@RestController
@RequestMapping("")
@CrossOrigin
public class SampleController {
	@Autowired
	 SampleMapper sampleservice;
	@Autowired
	 ContactTestProjectMapper testprojectservice;
	@RequestMapping(value ="samples/{Params}",method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject updateSample(
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
		return  JSONObject.parseObject(JSONObject.toJSONString(sampleservice.getsample(Params))); 
		else if(request.getMethod().contentEquals("DELETE"))
		{
			testprojectservice.deleteprojectbysample(Params); 
			sampleservice.deletesample(Params);	
			
		}
		return new JSONObject();
    }
	@RequestMapping(value ="samples/20/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getSamples (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		JSONArray ja=Params.getJSONArray("filter");
		if(ja.size()>0)
		{			
		 List<Sample> samples=sampleservice.getsamples(ja.getJSONObject(0).getString("value"));
	    String retstr= String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(samples),samples.size(),Params);
	    System.out.println(retstr);
	     return retstr; 
		}
		return String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", "[]",0,Params);
  }
	@RequestMapping(value ="samples",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject addSamples (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers,
		    HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		
		if(request.getMethod().contentEquals("POST"))
			sampleservice.addsample(JSONObject.toJavaObject(Params, Sample.class));
			else if(request.getMethod().contentEquals("PUT"))
			{
				sampleservice.updatesample (JSONObject.toJavaObject(Params, Sample.class));
			}
		    return Params; 
  }
	@RequestMapping(value ="samples/supplimentupdatesamples",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject supplimentupdatesamples(
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers,
		    HttpServletRequest request
			) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		JSONObject jo=new JSONObject();
		try
		{
		List<Sample> samples=	Params.getJSONArray("sampledatas").toJavaList(Sample.class);
		sampleservice.supplimentupdatesamples(samples);
		}
		catch(Exception ex)
		{
			jo.put("msg", ex.getMessage());
			jo.put("stack", ex.getStackTrace());
		}
		return jo;
	}
}
