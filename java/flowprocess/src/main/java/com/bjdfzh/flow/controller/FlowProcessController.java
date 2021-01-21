package com.bjdfzh.flow.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.history.HistoricVariableInstanceQuery;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.VariableInstance;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.activiti.image.ProcessDiagramGenerator;
import org.activiti.image.impl.DefaultProcessDiagramGenerator;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.ApplicationContextHanler;
import com.bjdfzh.flow.cache.CacheGet;
import com.bjdfzh.flow.dao.FlowNodeMapper;
import com.bjdfzh.flow.dao.RoleDiscountMapper;
import com.bjdfzh.flow.entity.ActivitiEventHandler;
import com.bjdfzh.flow.entity.ActivitiUtils;
import com.bjdfzh.flow.entity.CustomProcessDiagramGenarate;
import com.bjdfzh.flow.entity.FlowUtil;
import com.bjdfzh.flow.entity.TaskNode;
import com.bjdfzh.util.JwtUtil; 
@RestController
@RequestMapping("activity")
@CrossOrigin
@Qualifier
public class FlowProcessController {
	private static final Logger logger=LoggerFactory.getLogger(FlowProcessController.class);
	/** 流程定义和部署相关的存储服务 */
	@Autowired
	private RepositoryService repositoryService; 
	/** 流程运行时相关的服务 */
	@Autowired
	private RuntimeService runtimeService;
	@Autowired
	private FlowNodeMapper flowroleservice;
	/** 节点任务相关操作接口 */
	@Autowired
	private TaskService taskService;
	 @Value("${remoteurls.modifyprojectno}")
	 String modifyprojectno;
	/** 流程图生成器 */
	 
	private ProcessDiagramGenerator processDiagramGenerator=new DefaultProcessDiagramGenerator();;
	 
	/** 历史记录相关服务接口 */
	@Autowired
	private HistoryService historyService;
	 
	/**
	 * <p>启动请假流程（流程key即xml中定义的ID为leaveProcess）</p>
	 * @return String 启动的流程ID
	 * @author FRH
	 * @time 2018年12月10日上午11:12:50
	 * @version 1.0
	 */
	
	@RequestMapping(value="/start",method = { RequestMethod.POST,
			RequestMethod.GET }, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject start(@RequestBody JSONObject  startparam) {
		/*
		 *  xml中定义的ID
		 */
		//String instanceKey = "myProcess";
		logger.info("开启检测流程..."); 
		/*
		 *  设置流程参数，开启流程
		 */
		 
        
		ProcessInstance instance = runtimeService.startProcessInstanceByKey(startparam.getString("instanceKey"),startparam.getString("contactid"), startparam);//使用流程定义的key启动流程实例，key对应helloworld.bpmn文件中id的属性值，使用key值启动，默认是按照最新版本的流程定义启动
		
		logger.info("启动流程实例成功:{}", instance);
		logger.info("流程实例ID:{}", instance.getId());
		logger.info("流程定义ID:{}", instance.getProcessDefinitionId()); 
		/*
		 * 验证是否启动成功
		 */
	    //通过查询正在运行的流程实例来判断
	    ProcessInstanceQuery processInstanceQuery = runtimeService.createProcessInstanceQuery();
	    //根据流程实例ID来查询
	    List<ProcessInstance> runningList = processInstanceQuery.processInstanceId(instance.getProcessInstanceId()).list();
	   
	    logger.info("根据流程ID查询条数:{}", runningList.size()); 
	     
	   Task task= taskService.createTaskQuery().processInstanceId(instance.getId()).active().singleResult();
	   /*Task t= taskService.createTaskQuery().processInstanceBusinessKey(projectid).list().get(0);
	    taskService.complete(t.getId());
	    /*
	     *  返回流程ID
	     */
	    JSONObject json=new JSONObject();
	    json.put("instanceid", instance.getId());
	    json.put("TaskId", task.getId());
		return json;
	}
	/**
	 * <p>查看当前流程图</p>
	 * @param instanceId 流程实例
	 * @param response void 响应
	 * @author FRH
	 * @time 2018年12月10日上午11:14:12
	 * @version 1.0
	 */ 
	@RequestMapping(value="/showImg",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject showImg(@RequestBody JSONObject Param) {
		/*
		 * 参数校验
		 */
		String instanceId=Param.getJSONArray("filter").getJSONObject(0).getString("value");
		JSONObject jo=new JSONObject();
		logger.info("查看完整流程图！流程实例ID:{}", instanceId);
		if(StringUtils.isBlank(instanceId)) return jo;  
		 
	   InputStream	iputstream=this.getActivitiProccessImage(instanceId);
		if(iputstream == null) {
			logger.error("流程实例ID:{}没查询到流程实例！", instanceId);
			return jo;
		}
		
		 
		jo.put("output", ActivitiUtils.StreamToXML( iputstream));
		return jo;
	}
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/allprocess",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject getAllProcess(@RequestParam(required=false)String Params)
	{  
		  JSONObject retjo=new JSONObject();
		  JSONArray ja=new JSONArray(); 
		  try
		  {
	     Supplier<Stream<ProcessDefinition>> depids=()-> repositoryService.createProcessDefinitionQuery().list().stream() ;
	     List<Integer> versions=  depids.get().map(ProcessDefinition::getVersion).distinct().collect(Collectors.toList());
	     List<String> processkeys= depids.get().map(ProcessDefinition::getKey).distinct().collect(Collectors.toList());
		   processkeys.sort((x1,x2)->x1.compareTo(x2));
		 versions.sort((x1,x2)->x1.compareTo(x2)); 
		 
		  int maxversion=1,currentversion=1;
		  if(versions.size()>1)
		  {
			  
			  maxversion=versions.get(versions.size()-2); 
			  currentversion=versions.get(versions.size()-1);
		  }
		  else
		  {  
			  maxversion=versions.get(0); 
			  currentversion=versions.get(0);
		  }
		  for(String processkey:processkeys)
		  {
			  for(int version:versions)
			  {
				Supplier<Stream<ProcessDefinition>> st=()-> depids.get().filter(c->c.getKey().contentEquals(processkey)&&c.getVersion()==version) ;
				if(st !=null&&st.get().count()>0)
				{
				ProcessDefinition dep=st.get().findFirst().get();
				if( version==maxversion)
				{
					retjo.put("maxid", dep.getId());
				}
				if( version==currentversion)
				{
					retjo.put("currentid", dep.getId());
				}
				JSONObject jo=new JSONObject();
				jo.put("id", dep.getId());
				jo.put("processkey", dep.getKey());
				jo.put("label", String.format("%s:%d", dep.getName(),dep.getVersion()) );
				jo.put("pid", null);
				jo.put("sort", dep.getVersion());
				ja.add(jo); 
				Collection<UserTask> elements=  repositoryService.getBpmnModel(dep.getId()).getProcesses().get(0)
						                           .findFlowElementsOfType(UserTask.class);
				  for(UserTask ele:elements)
				  { 
					  jo=new JSONObject();
						jo.put("id", dep.getId()+ele.getId());
						jo.put("tasknodeid",  ele.getId());
						jo.put("processkey", dep.getKey());
						jo.put("label", ele.getName());
						jo.put("pid", dep.getId());
						jo.put("sort", dep.getVersion());
						ja.add(jo);
				  }
				}
			  }
		  }
		  }
		  catch(Exception e)
		  {
			  logger.error("错误信息:{}",e.getMessage());
			  logger.error("错误:{}",e.getStackTrace());
		  }
		  retjo.put("list", ja);
		 return retjo;
	}
	
	@RequestMapping(value="/excutetask",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
    public JSONObject excutetask(@RequestBody JSONObject formparm
    		 ,@RequestHeader(name="Authorization") String headers 
    		)
    {
		JSONObject jo=new JSONObject();
		try
		{
		
	   Task t= taskService.createTaskQuery().taskId(formparm.getString("taskid")).singleResult();
	  
		if(t !=null)
		{
			JSONObject jb=formparm.getJSONObject("formkey");
			
			
			if(jb !=null)
			{
				JSONObject joo=new JSONObject();
				joo.put("type", 2);
				JSONObject object=new JSONObject();
				object.put("id",  jb.get("userid"));
				object.put("name",  jb.get("username"));
				joo.put("object",object ); 
				jb.put("token", headers);
				jb.put("updataprojecturl", this.modifyprojectno ); 
				 taskService.setAssignee(formparm.getString("taskid"), joo.toJSONString());
			} 
		     taskService.setVariablesLocal(formparm.getString("taskid"), jb);
		
	    taskService.complete(formparm.getString("taskid"));
		}
	
		jo.put("MSG", "成功");
		return jo;
		}
		catch(Exception e)
		{
			jo.put("MSG", e);
		}
		return  jo;
    }
	/**
     * 更新单个流程
     * @param processDefinitionId 流程定义ID
     * @return
     */
    @RequestMapping(value="/deploy",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
    public void deploy(@RequestBody JSONObject Filename){
       
         
        try {
            if (  Filename !=null){
                //根据流程定义ID查找
                String file=Filename.getString("file");
                if(file !=null&&file!="")
                { 
                  this.repositoryService.createDeployment()
                  .name(file)
                  .addClasspathResource(String.format("processes/%s.bpmn", file))
                  .deploy(); 
                }
                
            }
        } 
        catch (Exception e) {
            // TODO: handle exception
            logger.error("", e);
            
        }finally {
             
        }
        
    }
    @Autowired
     CacheGet cacheService;
    private Map<String,Map<String,String>> getDefineidTasks(Supplier<Stream<HistoricTaskInstance>> instancetasks,String roleid)
    {
    	List<String> defineids=instancetasks.get().map(HistoricTaskInstance::getProcessDefinitionId).distinct().collect(Collectors.toList());
    	Map<String,Map<String,String>> retmap=new ConcurrentHashMap<String,Map<String,String>>();
    	for(String defid:defineids)
		{
    		Map<String,String> getmap=cacheService.getTaskdefineIdByRole(roleid, defid);
    		if(getmap!=null)
			retmap.put(defid,getmap );
		}
    	return retmap;
    }
    @SuppressWarnings("unused")
	private List<HistoricTaskInstance> getTasksByRoleId(Supplier<Stream<HistoricTaskInstance>> instancetasks,String roleid,boolean iscomplete)
    {
    	List<HistoricTaskInstance> taskList=new ArrayList<HistoricTaskInstance>();
    	Map<String,Map<String,String>> maptaskids=getDefineidTasks(instancetasks,roleid);
		List<HistoricTaskInstance> tqs=instancetasks.get().collect(Collectors.toList());
		for(HistoricTaskInstance ta : tqs)
		{
			String assignee=ta.getAssignee();
		 if(StringUtils.isBlank(assignee)  )
		 {
		 if(maptaskids.containsKey(ta.getProcessDefinitionId())
				 &&maptaskids.get(ta.getProcessDefinitionId())
				 .containsKey(ta.getTaskDefinitionKey()))
			 {
			 if(ta.getEndTime()==null)
			 taskList.add(ta);
			}
		 }
		 else if(StringUtils.isNotBlank(assignee))
		 {
			 try
			 {
			 JSONObject jo=JSONObject.parseObject(assignee);
				if(!iscomplete&&jo.getInteger("type")==1&&jo.getJSONObject("object").getString("id").contentEquals(roleid)&&ta.getEndTime()==null)
				{    
					taskList.add(ta); 
				}
			 }
			 catch(Exception ex) 
			 {
				 ex.printStackTrace();
			 }
		 }
	  }
		return taskList;
    }
    List<HistoricTaskInstance> getTaskbyUserid(String userid,  List<HistoricTaskInstance> tasks,boolean iscomplete)
    {
    	List<HistoricTaskInstance> usertasks=new ArrayList<HistoricTaskInstance>();
    	for(HistoricTaskInstance task:tasks)
    	{
    		try
			{
    			String assignee=task.getAssignee();
    			if(StringUtils.isNotBlank(assignee))
    			{
    				JSONObject jo=JSONObject.parseObject(assignee);
    				if(jo.getInteger("type")==2&&jo.getJSONObject("object").getString("id").contentEquals(userid))
    				{
    					if(iscomplete&&task.getEndTime() !=null)
    					usertasks.add(task);
    					else if(!iscomplete&&task.getEndTime()==null)
    					{
    						usertasks.add(task);
    					}
    				}
    				
    			 
    			}
			}
    		catch(Exception ex)
    		{
    			
    		}
    		 
    	}
    	return usertasks;
    }
    @Autowired
    private FlowNodeMapper nodeService;
    @RequestMapping(value="getassignees",method = {RequestMethod.POST,RequestMethod.PUT},produces = "application/json;charset=UTF-8")
	@ResponseBody
	JSONObject getassignees(@RequestBody JSONObject Params
			 ,@RequestHeader(name="Authorization") String headers
			) throws Exception
	{
		if(!JwtUtil.isExpire(headers))
		{
			throw new Exception("认证已经过期，请登录");
		}
		 
		Task task=taskService.createTaskQuery().taskId(Params.getString("taskid")).singleResult();
		TaskNode node= nodeService.getFlowNodeById(task.getTaskDefinitionKey(), task.getProcessDefinitionId());
		
		ActivitiEventHandler handler=(ActivitiEventHandler)	ApplicationContextHanler.getBean(node.getHandleclass());
		return handler.handle(Params, node);
		 
		
	}
    @RequestMapping(value="/gettasksbypara",method = {RequestMethod.POST,RequestMethod.GET},produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject toShowTaskbyParams(@RequestBody JSONObject params) { 
		JSONObject jb=new JSONObject();
		try
		{
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>(); 
		List<HistoricTaskInstance> taskList =new ArrayList<HistoricTaskInstance>();
		String userid=params.getString("userid");
		boolean iscomplete=params.getBooleanValue("iscomplete");
		JSONArray roleids=params.getJSONArray("roles");
		String instanceid=params.getString("instanceid");
		 List<HistoricTaskInstance> tqs=this.historyService.createHistoricTaskInstanceQuery().list();
		 if(tqs.size()>0)
		 {
			   Supplier<Stream<HistoricTaskInstance>> tasks=()->tqs.parallelStream();
		  if(instanceid !=null&&instanceid!=null)
			 {
			  Supplier<Stream<HistoricTaskInstance>> instancetasks=()->tasks.get().filter(c->c.getProcessInstanceId().contentEquals(instanceid));
			if(userid!=null&&userid !="")
			{
				taskList=this.getTaskbyUserid(userid, instancetasks.get().collect(Collectors.toList()),iscomplete);
			}
			if(roleids!=null&&roleids.size()>0)
			{
				for(int i=0;i<roleids.size();i++)
				{
				  String roleid=roleids.getJSONObject(i).getString("id");
				  taskList.addAll( getTasksByRoleId(instancetasks,roleid,iscomplete));
				}
			} 
		 }
		 else if(instanceid ==null)
		 {
			 if(userid!=null&&userid !="")
				{
				 taskList=this.getTaskbyUserid(userid, tasks.get().collect(Collectors.toList()),iscomplete);
					
				}
			   if(roleids!=null&&roleids.size()>0)
				{
				 for(int i=0;i<roleids.size();i++)
					{
						String roleid=roleids.getJSONObject(i).getString("id");
					List<HistoricTaskInstance> addtasks=	getTasksByRoleId(tasks,roleid,iscomplete);
					if(addtasks.size()>0)
					  taskList.addAll( addtasks);
					}
				}
				 
		 }
		 }
		if(taskList == null || taskList.size() == 0) {
			logger.info("查询任务列表为空！");
			jb.put("Msg", "查询任务列表为空！");
			jb.put("length", 0);
			jb.put("list", resultList);
			return jb;
		}
		/*
		 * 查询所有任务，并封装
		 */
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(HistoricTaskInstance task : taskList) { 
			String assignee=task.getAssignee();
			Map<String, Object> map = new HashMap<String, Object>(); 
			map.put("id", UUID.randomUUID().toString());
			map.put("taskid", task.getId()); 
			map.put("taskkey", task.getTaskDefinitionKey());
			if(StringUtils.isBlank(assignee))
			map.put("name", task.getName()); 
			else
			{
				JSONObject j=JSONObject.parseObject(assignee);
				String assigneeName= j.getString("assigneeName");
				if(StringUtils.isBlank(assigneeName))
				{
					map.put("name", task.getName()); 
				}
				else
				{
					map.put("name", assigneeName); 
				}
			}
			if(task.getEndTime()!=null)
			map.put("endTime", dateformat.format(task.getEndTime()));
			map.put("createtime", dateformat.format(task.getCreateTime()));
			map.put("assignee", task.getAssignee());
			map.put("instanceid", task.getProcessInstanceId());
			map.put("executionId", task.getExecutionId());
			map.put("definitionid", task.getProcessDefinitionId());
			map.put("taskdefinid", task.getTaskDefinitionKey());
			JSONObject hitory= FlowUtil.queryUpOneNodeMessage(task.getProcessInstanceId(), historyService);
			if(hitory!=null)
			{
			    Map<String,Object> varis=hitory.getJSONObject("Varibles");
				map.put("contactid", varis.get("contactid"));
				map.put("qupricediscount",  varis.get("qupricediscount"));
				map.put("limitdiscount", varis.get("limitdiscount"));
				map.put("customername",varis.get("customername"));
				map.put("preuser", varis.get("username")); 
				map.put("ugencytype", varis.get("ugencytype"));
				map.put("isextern", varis.get("isextern"));
			}
			map.put("from", hitory==null?"流程启动":hitory.getString("Name"));
			map.put("router",cacheService.getTaskRouterBytaskdefine(task.getProcessDefinitionId(), task.getTaskDefinitionKey()));
			resultList.add(map); 
		} 
		
		/*
		 * 返回结果
		 */
		logger.info("返回集合:{}", resultList.toString());
		//request.setAttribute("resultList", resultList);
		resultList.sort((c1,c2)-> c2.get("createtime").toString().compareTo(c1.get("createtime").toString()));
		jb.put("list", resultList);
		jb.put("Msg", "获取成功");
		jb.put("length", resultList.size());
		}
		catch(Exception e)
		{
			logger.error("错误信息:{}",e.getMessage());
			logger.error("错误:{}",e.getStackTrace());
		}
		return jb;
	}
	
	 
	/**
     * 获取流程图像，已执行节点和流程线高亮显示
     */
    private InputStream getActivitiProccessImage(String processInstanceId) {
        //logger.info("[开始]-获取流程图图像");
        try {
            //  获取历史流程实例
            HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery()
                    .processInstanceId(processInstanceId).singleResult();

            if (historicProcessInstance == null) {
                //throw new BusinessException("获取流程实例ID[" + processInstanceId + "]对应的历史流程实例失败！");
            } else {
                // 获取流程定义
                ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
                        .getDeployedProcessDefinition(historicProcessInstance.getProcessDefinitionId());

                // 获取流程历史中已执行节点，并按照节点在流程中执行先后顺序排序
                List<HistoricActivityInstance> historicActivityInstanceList = historyService.createHistoricActivityInstanceQuery()
                        .processInstanceId(processInstanceId).orderByHistoricActivityInstanceId().asc().list();
                // 已执行的节点ID集合
                List<String> executedActivityIdList = new ArrayList<String>();
                //logger.info("获取已经执行的节点ID");
                for (HistoricActivityInstance activityInstance : historicActivityInstanceList) {
                    executedActivityIdList.add(activityInstance.getActivityId());
                }

                BpmnModel bpmnModel = repositoryService.getBpmnModel(historicProcessInstance.getProcessDefinitionId());

                // 已执行的线集合
                List<String> flowIds = new ArrayList<String>();
                // 获取流程走过的线 (getHighLightedFlows是下面的方法)
                flowIds = ActivitiUtils.executedFlowIdList(bpmnModel, processDefinition, historicActivityInstanceList);

                // 获取流程图图像字符流
                CustomProcessDiagramGenarate pec = new CustomProcessDiagramGenarate();

                ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
                boolean end=false;
                if( processInstance==null){
                    end=true;
                }
                //配置字体
                InputStream imageStream = pec.generateDiagram(end,bpmnModel, "png", executedActivityIdList, flowIds, "宋体", "宋体", "宋体", null, 2.0);

                 
                return imageStream;
            }
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
             
        }
       return null;
    }
}
