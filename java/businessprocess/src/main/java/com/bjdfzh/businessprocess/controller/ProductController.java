package com.bjdfzh.businessprocess.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.ProductMapper;
import com.bjdfzh.businessprocess.entity.Product;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.util.CacheGetBusinessModel;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("inputproduct")
@CrossOrigin
public class ProductController {
	@Autowired
	 ProductMapper productService;
	@Autowired
	CacheGetBusinessModel cacheService;
	@RequestMapping(value ="getproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
	    JSONObject jo=new JSONObject();
	    List<Product> data=cacheService.getProductList();
	    jo.put("list", data);
	    jo.put("total", data.size());
	    jo.put("query", Params);
		return jo;
	}
	@RequestMapping(value ="geteproductbyid",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getproductbyid(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		String id=Params.getString("productid");
		JSONObject jo=new JSONObject();
		Map<String,Product> products=cacheService.getProducts();
	   Product  data=new Product();
	   if(products.containsKey(id))
	   data= products.get(id);
	    jo.put("prodct", data); 
	    jo.put("query", Params);
		return jo;
	}
	@RequestMapping(value ="addproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject addproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 Product  product=   Params.toJavaObject( Product.class);
		cacheService.addProduct( product);
		return Params;
	}
	@RequestMapping(value ="deleteproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject deleteproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 String id=Params.getString("productid");
		cacheService.deleteProduct(id); 
		return Params;
	}
	@RequestMapping(value ="updateproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject updateproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 Product pduct=   Params.toJavaObject(Product.class);
		cacheService.updateProduct(pduct);
		return Params;
	}
	@RequestMapping(value ="getsearchproductlist",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getsearchproductlist(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 String searchstring=Params.getString("searchkey");
		 List<Product> list= new ArrayList<>();
		 if(!StringUtils.isEmpty(searchstring))
		 {
		 String searchkey=String.format("%s%s%s","%",  searchstring,"%");
	    list=   productService.searchproduct(searchkey);
		 }
		 else
		 {
			 list=   cacheService.getProductList();
		 }
	    JSONObject jo=new JSONObject();
	    jo.put("total", list.size());
	    jo.put("list", list);
	    jo.put("Query", Params);
	    return jo;
	}
	@RequestMapping(value ="getqualificationbyproduct",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getqualificationbyproduct(@RequestBody JSONObject Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception {  
				  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 String id=Params.getString("id");
	    List<Qualification> list=   cacheService.getQualificationByProductId(id);
	    JSONObject jo=new JSONObject();
	    jo.put("total", list.size());
	    jo.put("list", list);
	    jo.put("Query", Params);
	    return jo;
	}
}
