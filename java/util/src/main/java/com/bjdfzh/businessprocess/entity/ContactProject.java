package com.bjdfzh.businessprocess.entity;

import java.util.Date;
import java.util.List;

import com.bjdfzh.userprivilage.entity.CommonType;

public class ContactProject {
	String contactid ;
	public String getContactid() {
		return contactid;
	}
	public void setContactid(String contactid) {
		this.contactid = contactid;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectnumber() {
		return projectnumber;
	}
	public void setProjectnumber(String projectnumber) {
		this.projectnumber = projectnumber;
	}
	 
	public int getReportcount() {
		return reportcount;
	}
	public void setReportcount(int reportcount) {
		this.reportcount = reportcount;
	}
	
	public CommonType getDomain() {
		return domain;
	}
	public void setDomain(CommonType domain) {
		this.domain = domain;
	} 
	public int getProjectstatus() {
		return projectstatus;
	}
	public void setProjectstatus(int projectstatus) {
		this.projectstatus = projectstatus;
	}
	String id ; 
	String projectnumber ; 
	int reportcount ; 
	int projectstatus ;
	 CommonType domain;
     List<Sample> samples  ;
      
     String domainlabel;  
    public List<Sample> getSamples() {
		return samples;
	}
	public void setSamples(List<Sample> samples) {
		this.samples = samples;
	}
	 
	public String getDomainlabel() {
		return domainlabel;
	}
	public void setDomainlabel(String domainlabel) {
		this.domainlabel = domainlabel;
	}
	Date dispatchtime;
	String dispatchroleid;
	String dispatchuserid;
	public Date getDispatchtime() {
		return dispatchtime;
	}
	public void setDispatchtime(Date dispatchtime) {
		this.dispatchtime = dispatchtime;
	}
	public String getDispatchroleid() {
		return dispatchroleid;
	}
	public void setDispatchroleid(String dispatchroleid) {
		this.dispatchroleid = dispatchroleid;
	}
	 
	 
	 Date createdate;
    public Date getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	List<ContactTestProject> testprojects;
	public List<ContactTestProject> getTestprojects() {
		return testprojects;
	}
	public void setTestprojects(List<ContactTestProject> testprojects) {
		this.testprojects = testprojects;
	}
}
