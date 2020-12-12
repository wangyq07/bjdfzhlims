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

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.CustomerMapper;
import com.bjdfzh.businessprocess.entity.Customer;
import com.bjdfzh.util.JwtUtil;
@RestController
@RequestMapping("")
@CrossOrigin
public class CustomerController {
	@Autowired
	 CustomerMapper customerservice;
	@RequestMapping(value ="customers/50/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getCustomers (
			@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		
		 List<Customer> customers=customerservice.getcustomers(Params.getJSONArray("filter").getJSONObject(0).getString("value"));
	    return   String.format("{\"list\":%s,\"total\":%d,\"query\":%s}", JSONObject.toJSONString(customers),customers.size(),Params);
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
