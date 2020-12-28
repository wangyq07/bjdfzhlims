package com.bjdfzh.businessprocess.controller;

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
import com.bjdfzh.businessprocess.dao.PriceProductMapper;
import com.bjdfzh.businessprocess.entity.PriceProduct;
import com.bjdfzh.businessprocess.entity.PriceQualification;
import com.bjdfzh.businessprocess.util.CacheGetBusinessModel;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("inputprice")
@CrossOrigin
public class PriceQualificationController {
	@Autowired
	 PriceProductMapper PriceProductService;
	@Autowired
	CacheGetBusinessModel cacheService;
	@RequestMapping(value ="getpriceproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getpriceproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
	    JSONObject jo=new JSONObject();
	    List<PriceProduct> data=PriceProductService.getpriceproduct();
	    jo.put("list", data);
	    jo.put("total", data.size());
	    jo.put("query", Params);
		return jo;
	}
	@RequestMapping(value ="getpriceproductbyid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getpriceproductbyid(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		String id=Params.getString("priceid");
		JSONObject jo=new JSONObject();
	   PriceProduct  data=PriceProductService.getpriceproductbyid(id);
	    jo.put("prodct", data); 
	    jo.put("query", Params);
		return jo;
	}
	@RequestMapping(value ="addpriceproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject addpriceproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		PriceProduct priceproduct=   Params.toJavaObject(PriceProduct.class);
		cacheService.addPriceProduct(priceproduct);
		return Params;
	}
	@RequestMapping(value ="deletepriceproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject deletepriceproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 String id=Params.getString("priceid");
		cacheService.deletePriceProduct(id); 
		return Params;
	}
	@RequestMapping(value ="updatepriceproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject updatepriceproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		PriceProduct pduct=   Params.toJavaObject(PriceProduct.class);
		cacheService.updatePriceProduct(pduct);
		return Params;
	}
	@RequestMapping(value ="getCurrentQualificationexists",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getCurrentQualificationexists(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		List<PriceQualification> qualifications=Params.getJSONArray("quals").toJavaList(PriceQualification.class);
		return cacheService.getCurrentQualificationexists(qualifications);
	}
}
