package com.bjdfzh.flow.entity;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.util.EhCacheUtil;
 
@Service("auditEventHandler")
public class ActivitiAuditEventHandlerImp implements ActivitiEventHandler{

	@Override
	public JSONObject handle(JSONObject param, TaskNode node) {
		// TODO 自动生成的方法存根
		List<String> assigneeList=new ArrayList<>();
		List<FlowSpecialDispatch> specials= node.getSpecialdispatch();
		if(specials!=null&&specials.size()>0)
		{
			String conditionstring=null;
			for(FlowSpecialDispatch fs :specials)
			{
				//#{qupricediscount<=limitdiscount||isextern!=0||urgency!=1
				switch(fs.conditionid)
				{
				case 1:
					 conditionstring=String.format(fs.conditionstring, param.getDoubleValue("qupricediscount"),param.getDoubleValue("limitdiscount")
							                           ,fs.getRole().getId(),fs.getRole().getName()); 
						setAssignee(fs,assigneeList,conditionstring);
				 
					break;
				case 2:
				 conditionstring=String.format(fs.conditionstring, param.getIntValue("isextern") 
							                           ,fs.getRole().getId(),fs.getRole().getName()); 
						setAssignee(fs,assigneeList,conditionstring);
				 
					break;
				case 3:
					 conditionstring=String.format(fs.conditionstring, param.getIntValue("urgency")
							                           ,fs.getRole().getId(),fs.getRole().getName()); 
						setAssignee(fs,assigneeList,conditionstring);
				 
					break;
				default:
					break;
				}
			}
		}
		param.put("assigneeList", assigneeList);
		return param;
	}
    void setAssignee(FlowSpecialDispatch fs,List<String> assigneeList,String conditionstring)
    {
    	boolean object=(boolean)EhCacheUtil.getObjectByScript(conditionstring);
		if(object)
		{
    	Assignee assignee=new Assignee();
		assignee.setAssigneeName(fs.conditionname);
		assignee.setObject(new JSONObject());
		assignee.getObject().put("id", fs.getRole().getId());
		assignee.getObject().put("name", fs.getRole().getName());
		assignee.setType(1);
		assigneeList.add(JSONObject.toJSONString(assignee));
		}
    }
	 

}
