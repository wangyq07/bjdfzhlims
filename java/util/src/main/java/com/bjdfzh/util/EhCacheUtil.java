package com.bjdfzh.util;

 

import java.util.ArrayList;
import java.util.List;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import com.alibaba.fastjson.JSONObject;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
 

public class EhCacheUtil {

	static CacheManager singletonManager;
	static String proName = "bjdfzh";
	static Cache defaultCache;
	static {
	singletonManager = CacheManager.create(EhCacheUtil.class.getResource("/ehcache/ehcache.cfg.xml"));
	defaultCache=singletonManager.getCache(proName);
	}
	static ScriptEngineManager manager = new ScriptEngineManager();
	static ScriptEngine se =null;
	static
	{
		se =manager.getEngineByName("js");
	}
public static  JSONObject getResultByScript(String script)
{ 
	JSONObject result=new JSONObject();
		try {
		result = JSONObject.parseObject(  JSONObject.toJSONString(  se.eval(script)));
	 
		} catch (ScriptException e) {
		e.printStackTrace();
		}
		return result;
}
public static  Object getObjectByScript(String script)
{ 
		try 
		{
		   return  se.eval(script);
		}
		catch (ScriptException e) 
		{
		    e.printStackTrace();
		 }
		  return null;
}

	 public static <E>  JSONObject getRetObjects (JSONObject Params,List<E> alldatas)
	 {
		 List<E> retorgs=new ArrayList<>();
		 int size=Params.getIntValue("size"),
				 index=Params.getIntValue("index");
		 if(size<10000&&size !=-1)
		 {
				 for(int i=(index-1)*size;i<size*index;i++)
				 {
					 if(i>alldatas.size()-1)
					 {
						 break;
					 }
					 retorgs.add(alldatas.get(i));
				 }
		 }
		 else
		 {
			 retorgs=alldatas;
		 }
				 JSONObject retobjects=new JSONObject();
				 retobjects.put("list", retorgs);
				 retobjects.put("total", alldatas.size());
				 retobjects.put("query", Params);
		return retobjects;
	 }
	@SuppressWarnings("deprecation")
	public static Object getValue(String key) {
		 //在缓存管理器中获取一个缓存实例
		
	    
	    Element element = defaultCache.get(key);
	    
	    if (element == null) {
			return null;
		} 
	    return element.getObjectValue();
	}
	/**
	 * 添加缓存
	 * @param key
	 * @param value
	 */
	public static void setValue(String key,Object value) {
		 
	    //使用获取到的缓存实例
	    Element element = new Element(key, value);
	    defaultCache.put(element);//添加缓存值
	    defaultCache.flush();
	}
	/**
	 * 删除缓存
	 * @param key
	 */
	public static void remove(String key) {
		 
		Element element = defaultCache.get(key);
		if (element != null) {		
			defaultCache.remove(key);
		}
		 
	}
}
