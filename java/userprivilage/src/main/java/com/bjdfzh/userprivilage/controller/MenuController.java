package com.bjdfzh.userprivilage.controller;

 

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
import com.bjdfzh.userprivilage.dao.ActionMapper;
import com.bjdfzh.userprivilage.dao.MenuMapper;
import com.bjdfzh.userprivilage.entity.Menu;
import com.bjdfzh.util.JwtUtil;

@RestController
@RequestMapping("")
@CrossOrigin
public class MenuController {
	
    @Autowired
    private MenuMapper menuService;
    @Autowired
    private ActionMapper actionService;
	@RequestMapping(value ="menus/9007199254740991/1",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject GetMenus (
			@RequestBody String Params
		    ,@RequestHeader(name="Authorization") String headers  ) throws Exception { 
		List<Menu> orgs=menuService.getmenus(); 
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
        return JSONObject.parseObject(String.format( "{\"list\":%s,\"total\":%d,\"query\":%s}",JSONObject.toJSONString(orgs),orgs.size(),Params));
    }
	
	@RequestMapping(value ="menus/{Params}",method = {RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject GetoOneMenu(
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
		return  JSONObject.parseObject(JSONObject.toJSONString(menuService.getmenu(Params))); 
		else if(request.getMethod().contentEquals("DELETE"))
		{
			actionService.deleteroleactionmapbymenu(Params);//鍒犻櫎璺熻彍鍗曠浉鍏崇殑瑙掕壊鎿嶄綔
			actionService.deleteactionbymenu(Params);//鍒犻櫎璺熻彍鍗曠浉鍏崇殑鎿嶄綔
			menuService.deletemenu(Params);//鍒犻櫎鑿滃崟
		}
		return new JSONObject();
    }
	@RequestMapping(value ="menus",method = {RequestMethod.PUT,RequestMethod.POST},produces = "application/json;charset=UTF-8")
    @ResponseBody
	public JSONObject updateMenu(
			@RequestBody JSONObject Params 
			,@RequestHeader(name="Authorization") String headers
			,HttpServletRequest httpServletRequest
			) throws Exception
	{  
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 if(httpServletRequest.getMethod().contentEquals("PUT"))
		  menuService.updatemenu(Params.toJavaObject(Menu.class));
		 if(httpServletRequest.getMethod().contentEquals("POST"))
			  menuService.addmenu(Params.toJavaObject(Menu.class));
		
		return Params;  
    }
}
