package com.bjdfzh.flow.entity;

import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.servlet.ServletContextEvent;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.impl.persistence.entity.VariableInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.ApplicationContextHanler;
import com.bjdfzh.businessprocess.entity.Contact;
import com.bjdfzh.flow.cache.CacheGet;
import com.bjdfzh.flow.notice.client.StompClient;
import com.bjdfzh.userprivilage.entity.HttpClientUtil;
import com.bjdfzh.userprivilage.entity.Role;
 
 @Service
public class TaskNodeEventListener implements ExecutionListener,TaskListener {
 
	@Autowired
	private CacheGet getservice;
	@Autowired
	private  StompClient stompclient;
	private static final long serialVersionUID = 7960387497099642910L;
	//ExecutionListener类的实现
	public void notify(DelegateExecution execution) {
	String eventName = execution.getEventName();
	//start
	if ("start".equals(eventName)) {
	System.out.println("start=========");
	}else if ("end".equals(eventName)) {
	System.out.println("end=========");
	}
	else if ("take".equals(eventName)) {
	System.out.println("take=========");
	}
	}
	
	 
	//实现TaskListener中的方法
	public void notify(DelegateTask delegateTask) { 
	String eventName = delegateTask.getEventName();
	 String taskKey= delegateTask.getTaskDefinitionKey() ;
	 switch(eventName)
	 {
	 case "complete":
		 {
			 if(taskKey.endsWith("task_customerserviceaudit"))
			 {
			 Map<String,VariableInstance> varibles=	 delegateTask.getVariableInstances();
			 if(varibles.size()>0)
			 {
				 System.out.print(varibles.get("username"));
			 }
			 
			/* JSONObject jo=new JSONObject();
			 VariableInstance vicontactid=varibles.get("contactid"),
					 vistandfee=varibles.get("standardfee"),
			   vitoken=varibles.get("token") 
			   ,viprojectupdate=varibles.get("updataprojecturl"); 
			 if(vicontactid !=null&&vitoken!=null)
			 {
			 Object o= vistandfee.getLongValue()==null?(vistandfee.getDoubleValue()==null?vistandfee.getTextValue():vistandfee.getDoubleValue()):vistandfee.getLongValue();
			  jo.put("contactid", vicontactid.getTextValue());
			  jo.put("standardfee",o);
			  HttpClientUtil.PostDataBody(jo, vitoken.getTextValue(), viprojectupdate.getTextValue());
			 }*/
			 }
		 }
		 break;
	 case "create":
		 if(stompclient==null)
		 {
			 
			 stompclient=(StompClient)ApplicationContextHanler.getBean("stompClient");
		 }
		 if(getservice==null)
		 {
			 getservice=(CacheGet)ApplicationContextHanler.getBean("cacheGet");
		 }
			TaskNode tn= getservice.getTaskNodeBytaskdefine(delegateTask.getProcessDefinitionId(), delegateTask.getTaskDefinitionKey());
		        for(Role role:tn.getRoles())
		        {
				 JSONObject jo=new JSONObject();
				  jo.put("rolename", role.getId());
				  jo.put("msg", delegateTask.getName());
				 try {
					stompclient.SendMessage(jo.toJSONString());
				} catch (UnsupportedEncodingException | ExecutionException | InterruptedException e) {
					// TODO 自动生成的 catch 块
					e.printStackTrace();
				}
		        }
		 
		 break;
	 default:
		 break;
	 }
	 
	}


}
