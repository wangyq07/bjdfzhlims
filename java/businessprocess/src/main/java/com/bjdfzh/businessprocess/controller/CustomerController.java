package com.bjdfzh.businessprocess.controller;

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

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.CustomerMapper;
import com.bjdfzh.businessprocess.entity.Customer;
import com.bjdfzh.util.EhCacheUtil;
import com.bjdfzh.util.JwtUtil;
@RestController
@RequestMapping("")
@CrossOrigin
public class CustomerController {
	@Autowired
	 CustomerMapper customerservice;
	@RequestMapping(value ="customers/{Params.size}/{Params.index}",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getCustomers (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		Map<String,Object>  map=new ConcurrentHashMap<>();
		map.put("userid", Params.getJSONArray("filter").getJSONObject(0).getString("value"));
		map.put("start", (Params.getIntValue("index")-1)*Params.getIntValue("size"));
		map.put("end", (Params.getIntValue("index")-1)*Params.getIntValue("size")+Params.getIntValue("size")-1);
		 List<Customer> customers=customerservice.getcustomers(map);
		 JSONObject retobjects=new JSONObject();
		 retobjects.put("list", customers);
		 retobjects.put("total", customers.size());
		 retobjects.put("query", Params);
         return retobjects;
   }
	@RequestMapping(value ="customers",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addCustomers (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers 
		    , HttpServletRequest request) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		  Customer cu=JSONObject.toJavaObject(Params, Customer.class); 
		  if(request.getMethod().contentEquals("POST"))
			  customerservice.addCustomer(cu); 
				else if(request.getMethod().contentEquals("PUT"))
				{
					customerservice.updatecustomer(cu);
				}
	 return JSONObject.toJSONString(cu); 
	     
   }
	@RequestMapping(value ="customers/{Params}",method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject updateCustomer(
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
		return  JSONObject.parseObject(JSONObject.toJSONString(customerservice.getcustomer(Params))); 
		else if(request.getMethod().contentEquals("DELETE"))
		{
			customerservice.deletecustomer(Params);			 
		}
		return new JSONObject();
    }
}
