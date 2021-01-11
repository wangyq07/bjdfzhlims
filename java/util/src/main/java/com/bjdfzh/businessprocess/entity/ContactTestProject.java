package com.bjdfzh.businessprocess.entity;

public class ContactTestProject {
	 String id; 
     int isextern;
	 public int getIsextern() {
		return isextern;
	}
	public void setIsextern(int isextern) {
		this.isextern = isextern;
	}
	 String qualificationid;
	 String outsitecustomerid;
	 String remark; 
	 double limitmax;
	 public double getLimitmax() {
		return limitmax;
	}
	public void setLimitmax(double limitmax) {
		this.limitmax = limitmax;
	}
	public double getLimitmin() {
		return limitmin;
	}
	public void setLimitmin(double limitmin) {
		this.limitmin = limitmin;
	}
	double limitmin;
	 double realprice;
	  
	public double getRealprice() {
		return realprice;
	}
	public void setRealprice(double realprice) {
		this.realprice = realprice;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	} 
	public String getQualificationid() {
		return qualificationid;
	}
	public void setQualificationid(String qualificationid) {
		this.qualificationid = qualificationid;
	}
	public String getOutsitecustomerid() {
		return outsitecustomerid;
	}
	public void setOutsitecustomerid(String outsitecustomerid) {
		this.outsitecustomerid = outsitecustomerid;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	String testproject;
	public String getTestproject() {
		return testproject;
	}
	public void setTestproject(String testproject) {
		this.testproject = testproject;
	}
	public String getMethodname() {
		return methodname;
	}
	public void setMethodname(String methodname) {
		this.methodname = methodname;
	}
	String sampleid;
	public String getSampleid() {
		return sampleid;
	}
	public void setSampleid(String sampleid) {
		this.sampleid = sampleid;
	}
	String methodname;
	double price;
	int standardid;
	int testprojectid;
	public int getStandardid() {
		return standardid;
	}
	public void setStandardid(int standardid) {
		this.standardid = standardid;
	}
	public int getTestprojectid() {
		return testprojectid;
	}
	public void setTestprojectid(int testprojectid) {
		this.testprojectid = testprojectid;
	}
	String standardname;
	String roleid;
	String userid;
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getStandardname() {
		return standardname;
	}
	public void setStandardname(String standardname) {
		this.standardname = standardname;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	int testcount=1;
	public int getTestcount() {
		return testcount;
	}
	public void setTestcount(int testcount) {
		if(testcount==0)
			this.testcount=1;
		else
		this.testcount = testcount;
	}
	
}
