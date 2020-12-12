package com.bjdfzh.businessprocess.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 
import com.bjdfzh.businessprocess.dao.QualificationCompanyMapper;
import com.bjdfzh.businessprocess.dao.QualificationMapper;
import com.bjdfzh.businessprocess.dao.TestProjectMapper;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.QualificationCompany;
import com.bjdfzh.businessprocess.entity.TestProject;
import com.bjdfzh.util.EhCacheUtil;
@Service
public class CacheGetBusinessModel {
	@Autowired
	QualificationMapper qualiService;
	@Autowired
	QualificationCompanyMapper companyquservice;
	@Autowired
	TestProjectMapper tpservice; 
	@SuppressWarnings("unchecked")
	public List<TestProject> gettestprojectbylevel(int level)
	{
		Map<Integer,List<TestProject>> projects=(Map<Integer,List<TestProject>>)EhCacheUtil.getValue("LevelTestProjects");
		if(projects==null||projects.size()==0)
		{
		  projects= new ConcurrentHashMap<Integer,List<TestProject>>();
		  List<TestProject> allprojects=getAllTestProjects();
		  Supplier<Stream<TestProject>> streamprojects=()->allprojects.parallelStream();
		  for(int setlevel=1;setlevel<=3;setlevel++)
		  {
			  int sellevel=setlevel;
			  List<TestProject> levelproject=streamprojects.get().filter(c->c.getLevel()==sellevel).collect(Collectors.toList());
			  if(levelproject.size()>0)
			  {
				  projects.put(setlevel, levelproject);
			  }
		  }
		  EhCacheUtil.setValue("LevelTestProjects",projects);
		}
      return projects.get(level);  
	}
	@SuppressWarnings("unchecked")
	public List<TestProject> gettestprojectbypid(String pid,boolean iscontainchild)
	{
		Map<String,List<TestProject>> projects=null;
		if(iscontainchild) 
			projects=(Map<String,List<TestProject>>)EhCacheUtil.getValue("pidTestProjectscontain");
		else
			projects=(Map<String,List<TestProject>>)EhCacheUtil.getValue("pidTestProjects");
		if(projects==null||projects.size()==0)
		{
		  projects= new ConcurrentHashMap<String,List<TestProject>>();
		   List<TestProject> rootproject=gettestprojectbylevel(1);
		   List<TestProject> secondproject=gettestprojectbylevel(2);
		   Supplier<Stream<TestProject>> secondstreamprojects=()->secondproject.parallelStream();
		   List<TestProject> thirdproject=gettestprojectbylevel(3);
		   Supplier<Stream<TestProject>> thirdstreamprojects=()->thirdproject.parallelStream();
		   for(TestProject first:rootproject)
		   {
			   if(!projects.containsKey("root"))
			   {
				   projects.put("root", new ArrayList<TestProject>());
			   }
			   projects.get("root").add(first);
			 List<TestProject> filterseconds=  secondstreamprojects.get().filter(c->c.getPid()!=null
					 &&c.getPid().contentEquals(first.getId())).collect(Collectors.toList());
		      if(filterseconds.size()>0)
		      {
		    	  projects.put(first.getId(), filterseconds);
		    	  if(iscontainchild)
		    	  {
		    		  projects.get("root").addAll(filterseconds);
		    	  }
		    	  for(TestProject second:filterseconds)
		    	  {
		    		  List<TestProject> filterthirds=  thirdstreamprojects.get().filter(c->c.getPid()
		    				                          .contentEquals(second.getId())).collect(Collectors.toList());
		    		  if(filterthirds.size()>0)
		    		  {
		    			  projects.put(second.getId(), filterthirds);
		    			  if(iscontainchild)
				    	  {
				    		  projects.get("root").addAll(filterthirds);
				    		  projects.get(first.getId()).addAll(filterthirds);
				    	  }
		    		  }
		    	  }
		      }
		   }
		  if(iscontainchild)
		  EhCacheUtil.setValue("pidTestProjectscontain",projects);
		  else
			  EhCacheUtil.setValue("pidTestProjects",projects);
		}
      return projects.get(pid);  
	}
	
	@SuppressWarnings("unchecked")
	public List<TestProject> getAllTestProjects()
	{
		List<TestProject> projects=(List<TestProject>)EhCacheUtil.getValue("TestProjects");
		if(projects==null||projects.size()==0)
		{
		  projects=  tpservice.gettestprojects();
		  EhCacheUtil.setValue("TestProjects",projects);
		}
		return projects;
	}
	@SuppressWarnings("unchecked")
	public Map<Integer,Map<String,List<Qualification>>>  getQualificationByProject()
	{
		String key="qualificationcompanycategory";
		Map<Integer,Map<String,List<Qualification>>> mplev=(Map<Integer,Map<String,List<Qualification>>>) EhCacheUtil.getValue(key);
		if(mplev==null||mplev.size()==0)
		{
		  mplev=new ConcurrentHashMap<Integer,Map<String,List<Qualification>>>();
		  List<QualificationCompany> companys=	companyquservice.getallqualificationcompanys();
		  List<TestProject> projectclass=gettestprojectbylevel(3);
		  for(QualificationCompany company:companys)
		  {
			  mplev.put(company.getId(), new ConcurrentHashMap<String,List<Qualification>>());
			 List<Qualification> companyqualis= getAllQualificationByCompany(company.getId());
			 Supplier<Stream<Qualification>> streams=()->companyqualis.parallelStream();
			  for(TestProject tp:projectclass)
			  {
				  String lab=tp.getLabel();
				  if(!mplev.get(company.getId()).containsKey(lab))
				  {
					  mplev.get(company.getId()).put(lab, new ArrayList<Qualification>());
				  List<Qualification> curstions=streams.get()
						  .filter(c->c.getTestproject().equals(lab))
						  .collect(Collectors.toList());
				  if(curstions.size()>0)
				  mplev.get(company.getId()).get(lab).addAll(curstions);
				  }
			  }
		  }
		  EhCacheUtil.setValue(key, mplev);
		}
		for(int i=1;i<=3;i++)
	    {
	    	System.out.println(String.format("%d:%d", i,mplev.get(i).size()));
	    }
		return mplev;
	}
	 
	@SuppressWarnings("unchecked")
	List<Qualification> getAllQualificationByCompany(Integer CompanyID)
	{
		String key="qualificationcompany"; 
		Map<Integer, List<Qualification>> mplev=(Map<Integer,List<Qualification>>) EhCacheUtil.getValue(key);
		List<Qualification> retqualis=new ArrayList<Qualification>();
	    if(mplev==null|| mplev.size()==0)
	    {
	    	 mplev=new ConcurrentHashMap<Integer, List<Qualification>>();
			  List<QualificationCompany> companys=	companyquservice.getallqualificationcompanys();
			  List<TestProject> projectclass=gettestprojectbylevel(1);
			  for(QualificationCompany company:companys)
			  {
				  List<Qualification> arrays=new ArrayList<Qualification>();
				  //mplev.put(company.getId(), new ArrayList<Qualification>());
				  for(TestProject tp:projectclass)
				  { 
					   
					  arrays.addAll(qualiService.getqualificationsbycompany
					  (Integer.parseInt(tp.getId()), company.getId()));
				  }
				  mplev.put(company.getId(), arrays);
				  //System.out.println(String.format("%s:%d", company.getLabel(),arrays.size()));
			  }
			  EhCacheUtil.setValue(key, mplev);
	    }
	    if(mplev.containsKey(CompanyID))
	    	retqualis=mplev.get(CompanyID);
	    
		 return retqualis;
	}
	public List<Qualification> getQualificationBySearch(int CompanyId,String searchkey)
	{
		List<Qualification> retlist=new ArrayList<Qualification>();
		 List<TestProject> projectclass=gettestprojectbylevel(3);
		   List<String> searchkeys=new ArrayList<String>();
		   Map<Integer,Map<String,List<Qualification>>> source=this.getQualificationByProject();
		   if(source !=null&&source.size()>0)
		   {
		    if(source.containsKey(CompanyId))
		    {
			   for(TestProject project:projectclass)
			   {
				   if(project.getLabel().contains(searchkey)&&!searchkeys.contains(project.getLabel()))
				   {
					   searchkeys.add(project.getLabel());
				   }
			   }
			   for(String key:searchkeys)
			   {
				   
				   if(source.get(CompanyId).containsKey(key))
				   {
					  List<Qualification> additems= source.get(CompanyId).get(key);
				     retlist.addAll(additems);
				     System.out.print(String.format("%s:%d", key,additems.size()));
				   }
			   }
			   }
		   }
		return retlist;
	}

}

