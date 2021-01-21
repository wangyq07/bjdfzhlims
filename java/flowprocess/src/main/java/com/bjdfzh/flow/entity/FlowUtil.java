package com.bjdfzh.flow.entity;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.el.ExpressionFactory;
import javax.el.ValueExpression;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.Process;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.event.impl.ActivitiEventImpl;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.bpmn.behavior.UserTaskActivityBehavior;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.util.ProcessDefinitionUtil;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.task.Task;
import org.activiti.spring.integration.Activiti;

import com.alibaba.fastjson.JSONObject;
import com.sun.el.ExpressionFactoryImpl;

import de.odysseus.el.util.SimpleContext;

public class FlowUtil {
	/** 
     * 获取下一个用户任务用户组信息  
     * @param String taskId     任务Id信息  
     * @return  下一个用户任务用户组信息  
     * @throws Exception 
     */ 
	TaskService taskService;
	RuntimeService runtimeService;
	RepositoryService repositoryService;
    public FlowUtil()
    {
    	
    }
     
      
    /**
    * 根据与流程定义key获取当前节点的下一个任务节点
    * @param key  流程定义Key
    * @param elementId当前节点Id
    * @param elString当前节点流向下一个节点的匹配字符串   
    * 如下      ${deptLeaderPass}--------------------------XML已定义的字符串
    *  ${!deptLeaderPass}
    * 获取领导同意的userTask，则传入 ${deptLeaderPass}
    * @return
    */
    public   Task getNextTaskDefinition(String key,String activityId,String elString,boolean bFlag){
    	
     return null;
    }

    /**
    * 根据key获得一个最新的流程定义
    * @param key
    * @return
    */
    public   ProcessDefinition getNewProcessDefinition(String key) {
    //根据key查询已经激活的流程定义，并且按照版本进行降序。那么第一个就是将要得到的最新流程定义对象
    List<ProcessDefinition> processDefinitionList = repositoryService.createProcessDefinitionQuery().processDefinitionKey(key).orderByProcessDefinitionVersion().desc().list();
    if (processDefinitionList.size() > 0) {
    return processDefinitionList.get(0);
    }
    return null;
    }
    /**
     * 根据流程实例id获取上一个节点的信息
     *
     * @param proInsId
     * @param historyService
     * @return
     */
    public static JSONObject queryUpOneNodeMessage(String proInsId, HistoryService historyService) {
        //上一个节点
        List<HistoricTaskInstance> list = historyService
                .createHistoricTaskInstanceQuery()
                .processInstanceId(proInsId)
                .orderByHistoricTaskInstanceEndTime()
                .desc()
                .list();
        HistoricTaskInstance taskInstance = null;
        if (!list.isEmpty()) {
            if (list.get(0).getEndTime() != null) {
                taskInstance = list.get(0);
            }
        }
        if(taskInstance==null)
        	return null;
         JSONObject jb=new JSONObject();
         jb.put("Name", taskInstance.getName());
         jb.put("Id", taskInstance.getId());
         //jb.put("Varibles", new ConcurrentHashMap<String,Object>());
       //Map<String,Object> objects=  taskInstance.getProcessVariables();
         jb.put("Varibles", getVariables(historyService,taskInstance));
        return jb;
    }
   public static JSONObject getVariables(HistoryService historyService,HistoricTaskInstance task)
    {
	   List<HistoricVariableInstance> ins=historyService
               .createHistoricVariableInstanceQuery()
               .processInstanceId(task.getProcessInstanceId())
               .taskId(task.getId())
               .list(); 
				JSONObject jjb=new JSONObject();
				for(HistoricVariableInstance hi:ins)
				{
				
				jjb.put(hi.getVariableName(), hi.getValue()); 
				
				}
				return jjb;
    }
    /**
     * 根据任务id获取上一个节点的信息
     *
     * @param taskId
     * @return
     */
    public static HistoricTaskInstance queryUpOneNode(String taskId, HistoryService historyService) {
        //上一个节点
        List<HistoricTaskInstance> list = historyService
                .createHistoricTaskInstanceQuery()
                .taskId(taskId).orderByHistoricTaskInstanceEndTime()
                .desc()
                .list();
        HistoricTaskInstance taskInstance = null;
        if (!list.isEmpty()) {
            if (list.get(0).getEndTime() != null) {
                taskInstance = list.get(0);
            }
        }
        return taskInstance;
    }
}
