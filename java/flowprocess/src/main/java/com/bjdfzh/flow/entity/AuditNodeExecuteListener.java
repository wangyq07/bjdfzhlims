package com.bjdfzh.flow.entity;

import java.util.Map;

import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.task.Task;

import com.bjdfzh.ApplicationContextHanler;

/**
	 * 消息通知任务监听器
	 */
	@SuppressWarnings("serial")
	public class AuditNodeExecuteListener implements ExecutionListener {
	 
	 
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
	//获取当前任务执行人
	        String assignee = task.getAssignee(); 
	//通过流程图中表单字段id获取表单字段值，即用户点击审批，在输入框中填入的'yes' 或'no'
	        String s = "isaudit";
	        Object o = variables.get(s);
	//若为no，设置result参数变量为n，pass为no,pass在流程启动时默认初值为yes
	        if (o != null && o.toString().equals("0")) {
	            //会签结束，设置参数pass为0，下个任务为申请
	            execution.setVariable("pass", 0); 
	        } else {
	//全部审批完
	            Integer complete = (Integer) execution.getParent().getVariable("nrOfCompletedInstances");
	            Integer all = (Integer) execution.getParent().getVariable("nrOfInstances");
	            execution.setVariable("nrOfCompletedInstances", complete+1);
	            //说明都完成了并且没有人拒绝
	            if ((complete + 1) / all == 1) {
	                execution.setVariable("pass", 1);
	            }
	        }
	    }

}
