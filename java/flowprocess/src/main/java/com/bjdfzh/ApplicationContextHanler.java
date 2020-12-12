package com.bjdfzh;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
@Service
public class ApplicationContextHanler implements ApplicationContextAware {

	private static ApplicationContext context;
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		// TODO 自动生成的方法存根
		context=applicationContext;
	}
   public static Object getBean(String name)
   {
	   return ApplicationContextHanler.context.getBean(name);
   }
   public static ApplicationContext getContext() {return ApplicationContextHanler.context;};
	
}
