package com.bjdfzh.businessprocess.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
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
  Date getFirstDayDateOfYear(final Date date) {

      final Calendar cal = Calendar.getInstance();

      cal.setTime(date);

      final int last = cal.getActualMinimum(Calendar.DAY_OF_YEAR);

      cal.set(Calendar.DAY_OF_YEAR, last);

      return cal.getTime();

  }
  Date getLastDayOfYear(final Date date) {

      final Calendar cal = Calendar.getInstance();

      cal.setTime(date);

      final int last = cal.getActualMaximum(Calendar.DAY_OF_YEAR);

      cal.set(Calendar.DAY_OF_YEAR, last);

      return cal.getTime();

  }
  String getDateString(Date date)
  {
	  DateFormat df =new SimpleDateFormat("yyyy-MM-dd");
	  return df.format(date);
  }
  @Value("${remoteurls.modifyflowprojectno}")
  String URL;
	 private  Semaphore semaphore = new Semaphore(1); 
	public void HandleProject(Contact contact,List<ContactProject> projects)
	{
		try {
			semaphore.acquire();
			String isCMA=contact.getSeal().stream().anyMatch(c->c.getId()==1)?"":"-B";
			projects.sort((c1,c2)->c1.getCreatedate().compareTo(c2.getCreatedate()));
			 if(projects.size()>0)
			 {
				 Date crdate=projects.get(0).getCreatedate();
			ContactProjectCount contactmax=getcountService.getprojectmaxcount(getDateString(getFirstDayDateOfYear(crdate)),getDateString(getLastDayOfYear(crdate))); 
			
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
			 
			 }
			 
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
	    Map<String,Object>  map=new ConcurrentHashMap<>();
		map.put("contactid",contactid);
		map.put("start",0);
		map.put("end", 20);
	   List<ContactProject> projects= contactProjectService.getcontactprojects(map);
	   projects.sort((c1,c2)->c1.getCreatedate().compareTo(c2.getCreatedate()));
		jb.put("projects", projects);
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
