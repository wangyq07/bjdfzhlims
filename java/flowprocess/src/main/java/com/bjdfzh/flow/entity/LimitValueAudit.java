package com.bjdfzh.flow.entity;

import java.util.Map;

import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.task.Task;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.ApplicationContextHanler;

@SuppressWarnings("serial")
public class LimitValueAudit implements ExecutionListener {
	@Override
    public void notify(DelegateExecution execution) {
        //修改审批状态
        Map<String, Object> variables = execution.getVariables();
       //在执行监听器中通过，执行实例id获取当前任务信息
        TaskService taskService = ApplicationContextHanler.getBean(TaskService.class);
        Task task = taskService.createTaskQuery().processInstanceId(execution.getProcessInstanceId()).executionId(execution.getId()).singleResult();
        if (task == null) {
            return;
        }  
        Object isaudit=variables.get("isaudit");
        if(isaudit.equals("0"))
        {
           Object userid= execution.getParent().getVariable("userid"); 
           Object username= execution.getParent().getVariable("username");
           if(userid !=null&&username!=null)
           {
           Assignee assignee=new Assignee();
           assignee.setAssigneeName(execution.getParent().getEventName());
           assignee.setType(2);
           JSONObject jo=new JSONObject();
           jo.put("id", userid);
           jo.put("name", username);
           assignee.setObject(jo);
           execution.setVariable("limitassignee", JSONObject.toJSONString(assignee));
           }
        }
        
             
       
    }
}
