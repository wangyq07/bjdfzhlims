package com.bjdfzh.flow.cache;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.bjdfzh.flow.dao.FlowNodeMapper;
import com.bjdfzh.flow.dao.RoleDiscountMapper;
import com.bjdfzh.flow.entity.RoleDiscount;
import com.bjdfzh.flow.entity.TaskNode;
import com.bjdfzh.userprivilage.entity.Role;
import com.bjdfzh.util.EhCacheUtil; 
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors; 
@Service("cacheGet")
public class CacheGet {
	 
	@Autowired
	FlowNodeMapper nodeService; 
	@Autowired 
	RoleDiscountMapper rmservice;
@SuppressWarnings("unchecked")
public List<RoleDiscount> getallDiscount()
{
	String key="AllRoleDiscount";
	List<RoleDiscount> retcounts=(List<RoleDiscount>) EhCacheUtil.getValue(key);
	if(retcounts==null||retcounts.size()==0)
	{
		retcounts=rmservice.getrolediscount();
		EhCacheUtil.setValue(key, retcounts);
	}
	return retcounts;
}
@SuppressWarnings(  "unchecked"   )
public Map<String,Map<String,RoleDiscount>> getMapDiscount()
{
	String key="MapRoleDiscount";
	Map<String,Map<String,RoleDiscount>> retcount=(Map<String, Map<String, RoleDiscount>>) EhCacheUtil.getValue(key);
	if(retcount==null||retcount.size()==0)
	{
	List<RoleDiscount>  alldiscount=getallDiscount();
	  retcount=new ConcurrentHashMap<String,Map<String,RoleDiscount>>();
	   for(RoleDiscount rdiscount:alldiscount)
	   {
		   if(rdiscount.getPid() !=null)
		   {
		   if( !retcount.containsKey(rdiscount.getPid()))
		   {
		   retcount.put(rdiscount.getPid(),new ConcurrentHashMap<String,RoleDiscount>());
		   }
		   if(!retcount.get(rdiscount.getPid()).containsKey(rdiscount.getRole().getId()))
		   {
			   retcount.get(rdiscount.getPid()).put(rdiscount.getRole().getId(), rdiscount);
		   }
		   }
	   }
	   EhCacheUtil.setValue(key, retcount);
	}
	return retcount;
}
public RoleDiscount getDiscountByDomainidRoleid(String domainid,String roleid)
{
	Map<String,Map<String,RoleDiscount>>  mapcount= this.getMapDiscount();
	if(mapcount.containsKey(domainid)&&mapcount
			.get(domainid).containsKey(roleid)) 
	{
	  return mapcount.get(domainid).get(roleid) ;
	}
	return null;
}
@SuppressWarnings("unchecked")
private String getDomainidByarea(String area)
{
	String key="customerareas";
	Map<String,String> domains=(Map<String, String>) EhCacheUtil.getValue(key);
	if(domains ==null||domains.size()==0)
	{
		  domains=new ConcurrentHashMap<String,String>();
	  List<RoleDiscount> counts=this.getallDiscount();
	  List<RoleDiscount> domaincount=counts.stream().filter(c->c.getPid()==null).collect(Collectors.toList());
	  for(RoleDiscount rolecount:domaincount)
	  {
		  domains.put(rolecount.getLabel(), rolecount.getId());
	  }
	  EhCacheUtil.setValue(key, domains);
	}
	String keyvalue=area.substring(0, 2);
	String othername="";
	for(String domainname:domains.keySet())
	{
		if(domainname.contains(keyvalue))
		{
			return domains.get(domainname);
		}
		if(domainname.contains("其它"))
		{
			othername=domains.get(domainname);
		}
	}
	return othername;
	
}
public double getDiscountValueByDomainidRoleid(String area,JSONArray roles)
{
	
  List<Double> counts=new ArrayList<Double>();
  String domainid= this.getDomainidByarea(area);
  for(int i=0;i<roles.size();i++)
  {
	  RoleDiscount rolecount=	getDiscountByDomainidRoleid(domainid,roles.getJSONObject(i).getString("id"));
	  if(rolecount !=null)
	  {
		  counts.add(rolecount.getDiscount());
	  }
  }
  if(counts.size()>0)
  {
	  return   counts.parallelStream().distinct().min((d1,d2)->d1.compareTo(d2)).get();
  }
	return 0;
}
	@SuppressWarnings("unchecked")
public List<TaskNode> getTaskNodeByFlow(String defineid)
 {  
	 String key=String.format("data%s", defineid);
	 List<TaskNode> retvalue=(List<TaskNode>)EhCacheUtil.getValue(key);
	 if(retvalue==null||retvalue.size()==0)
	 {
		 retvalue= nodeService.getFlowNodes(defineid);
		 EhCacheUtil.setValue(key, retvalue);
	 }
	 return retvalue;
 }
	@SuppressWarnings("unchecked")
	public String getTaskRouterBytaskdefine(String defineid,String Taskdefineid)
	 {  
		 String key=String.format("router%s", defineid); 
		 Map<String,String> retvalue=(Map<String,String>)EhCacheUtil.getValue(key);
		 if(retvalue==null||retvalue.size()==0)
		 {
			 retvalue=new ConcurrentHashMap<String,String>();
			 List<TaskNode> roletask=getTaskNodeByFlow(defineid); 
			 if(roletask !=null&&roletask.size()>0)
			 {
				 for(TaskNode tn:roletask)
				 {
					 if(tn.getFlowid().contentEquals(defineid))
					 retvalue.put(tn.getTasknodeid(),String.format("index/%s", tn.getMenu().getRouter()) );
				 }
				 EhCacheUtil.setValue(key, retvalue);
			 }
		 }
		 return retvalue.get(Taskdefineid);
	 }
	@SuppressWarnings("unchecked")
	public TaskNode getTaskNodeBytaskdefine(String defineid,String Taskdefineid)
	 {  
		 String key=String.format("Taskdefine%s", defineid); 
		 Map<String,TaskNode> retvalue=(Map<String,TaskNode>)EhCacheUtil.getValue(key);
		 if(retvalue==null||retvalue.size()==0)
		 {
			 retvalue=new ConcurrentHashMap<String,TaskNode>();
			 List<TaskNode> roletask=getTaskNodeByFlow(defineid); 
			 if(roletask !=null&&roletask.size()>0)
			 {
				 for(TaskNode tn:roletask)
				 {
					 if(tn.getFlowid().contentEquals(defineid))
					 retvalue.put(tn.getTasknodeid(), tn);
				 }
				 EhCacheUtil.setValue(key, retvalue);
			 }
		 }
		 return retvalue.get(Taskdefineid);
	 }
 @SuppressWarnings("unchecked")
 public Map<String,String> getTaskdefineIdByRole(String roleid,String defineid)
 {
    String key=String.format("role%s", defineid);
	 Map<String,Map<String,String>> retvalue=( Map<String,Map<String,String>>)EhCacheUtil.getValue(key);
	 if(retvalue==null||retvalue.size()==0)
	 {
		 retvalue=new ConcurrentHashMap<String,Map<String,String>>();
		 List<TaskNode> roletask=getTaskNodeByFlow(defineid); 
		 if(roletask !=null&&roletask.size()>0)
		 {
			 for(TaskNode tn:roletask)
			 {
				 if(tn.getFlowid().equals(defineid))
				 {
					  
					 for(Role role:tn.getRoles())
					 {
						if(!retvalue.containsKey(role.getId()))
						{
							retvalue.put(role.getId(), new ConcurrentHashMap<String,String>());
						}
						retvalue.get(role.getId()).put(tn.getTasknodeid(), tn.getTasknodeid());
					 }
					 
				    
				 }
			 }
			 EhCacheUtil.setValue(key, retvalue);
		 }
	 }
	 return retvalue.get(roleid);
 }
}
