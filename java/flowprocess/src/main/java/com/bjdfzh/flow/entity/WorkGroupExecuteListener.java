package com.bjdfzh.flow.entity;

import java.util.Map;

import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.task.Task;

import com.bjdfzh.ApplicationContextHanler;

@SuppressWarnings("serial")
public class WorkGroupExecuteListener implements ExecutionListener {
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
            Integer complete = (Integer) execution.getParent().getVariable("nrOfCompletedInstances");
            Integer all = (Integer) execution.getParent().getVariable("nrOfInstances");
            execution.setVariable("nrOfCompletedInstances", complete+1);
             
       
    }
}
