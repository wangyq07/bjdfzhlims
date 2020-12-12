package com.bjdfzh.util;

 

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
