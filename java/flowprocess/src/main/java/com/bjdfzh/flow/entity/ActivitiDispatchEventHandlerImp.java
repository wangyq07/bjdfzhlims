package com.bjdfzh.flow.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

@Service("dispatchTask")
public class ActivitiDispatchEventHandlerImp implements ActivitiEventHandler {

	@Override
	public JSONObject handle(JSONObject param, TaskNode node) {
		// TODO 自动生成的方法存根
		List<FlowSpecialDispatch> specials= node.getSpecialdispatch();
		List<String> assigneeList=new ArrayList<>();
		if(specials!=null&&specials.size()>0)
		{
			String conditionstring=null;
			  Supplier<Stream<FlowSpecialDispatch>> sps=			()->specials.stream();
			Optional<FlowSpecialDispatch> sampleManagerop= sps.get().filter(c->c.getConditionid()==4).findFirst();
			Optional<FlowSpecialDispatch> limitop= sps.get().filter(c->c.getConditionid()==5).findFirst();
			Stream<FlowSpecialDispatch> workgroupop= sps.get().filter(c->c.getConditionid()==6);
		 setAssigneeString(sampleManagerop,param,"sampleassignee");
		 setAssigneeString(limitop,param,"limitassignee");
		 
			 List<FlowSpecialDispatch>  workgroups= workgroupop.collect(Collectors.toList());
			 JSONArray ja=param.getJSONArray("roles");
			 for(FlowSpecialDispatch f:workgroups)
			 {
				 if(ja.contains(f.getRole().getId()))
				 {
					 Assignee  assignee=new Assignee();
						 assignee.setAssigneeName(f.getRole().getName());
						 assignee.setType(1);
						JSONObject jo=new JSONObject();
						jo.put("id", f.getRole().getId());
						jo.put("name", f.getRole().getName());
						 assignee.setObject(jo);
						 assigneeList.add(JSONObject.toJSONString(assignee));
				 }
			 }
			 if(assigneeList.size()>0)
			 {
				 param.put("assigneeList", assigneeList);
			 }
		 
			 
		}
		return param;
	}
   void setAssigneeString(Optional<FlowSpecialDispatch> sampleManagerop,JSONObject param,String keyname)
   {
	   if(sampleManagerop.isPresent())
		{
			FlowSpecialDispatch samplemanager=sampleManagerop.get();
			Assignee sampleassignee=new Assignee();
			sampleassignee.setAssigneeName(samplemanager.getConditionname());
			sampleassignee.setType(1);
			JSONObject jo=new JSONObject();
			jo.put("id", samplemanager.getRole().getId());
			jo.put("name", samplemanager.getRole().getName());
			sampleassignee.setObject(jo);
		   param.put(keyname, JSONObject.toJSONString(sampleassignee)) ;
		}
	   
   }

}
