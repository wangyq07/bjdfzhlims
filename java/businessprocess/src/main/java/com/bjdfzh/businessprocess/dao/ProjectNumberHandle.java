package com.bjdfzh.businessprocess.dao;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.Semaphore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.entity.Contact;
import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactProjectCount;
import com.bjdfzh.userprivilage.entity.HttpClientUtil;
@Service
@Transactional
public class ProjectNumberHandle {
  @Autowired
  ContactMapper contactService;
  @Autowired
  ContactProjectCountMapper getcountService;
  @Autowired
  ContactProjectMapper contactProjectService;
  /*
   * 处理项目编号，考虑并发信号量问题，保证每次只能有一个进程处理项目号
   */
  @Value("${remoteurls.modifyflowprojectno}")
  String URL;
	 private  Semaphore semaphore = new Semaphore(1); 
	public void HandleProject(Contact contact,List<ContactProject> projects)
	{
		try {
			semaphore.acquire();
			String isCMA=contact.getSeal().stream().anyMatch(c->c.getId()==1)?"":"-B";
			ContactProjectCount contactmax=getcountService.getprojectmaxcount(); 
			projects.sort((c1,c2)->c1.getCreatedate().compareTo(c2.getCreatedate()));
			List<ContactProject> setprojects=new ArrayList<ContactProject>();
			for(int i=0;i<projects.size();i++)
			{
			    if(projects.get(i).getProjectstatus()==1)
			    	continue;
			   int year=	contactmax.getYear() %1000;
			   String month=getHandleString(projects.get(i).getCreatedate().getMonth()+1,2);
			   String domainStr=getHandleString(projects.get(i).getDomain().getId(),2);
			   String serialno=getHandleString(contactmax.getCount()+i+1,5);
			   projects.get(i).setProjectstatus(1);
			   projects.get(i).setProjectnumber(String.format("%d%s%s%s%s%s", year,month,domainStr,contact.getSamplesource().getCode(),serialno,isCMA));
			   setprojects.add( projects.get(i));
			}
			if(setprojects.size()>0)
			contactService.updateprpjectnumbers(setprojects); //更新项目号
			 
			 
			 
		} catch (InterruptedException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		finally
		{ 
		 semaphore.release();
		}
		 
	}
	public JSONObject getContactProject(String contactid)
	{
		JSONObject jb=new JSONObject();
	    jb.put("contact", contactService.getcontactbyid(contactid))	;
		jb.put("projects", contactProjectService.getcontactprojects(contactid));
		return jb;
	}
	String getHandleString(int number,int length)
	{
		String handleStr=String.format("%s", number);
		for(int i=handleStr.length()+1;i<=length;i++)
		{
			handleStr="0"+handleStr;
		}
		return handleStr;
	}
}
