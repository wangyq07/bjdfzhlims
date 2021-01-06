package com.bjdfzh.businessprocess.entity;

public class QualificationMethod {
	String id;
    int	qualificationid  ;
	 String  firstid ;
	 String firstname;
	 String secondname;
	 int updateflag=-1; 
	 double price;
	 public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getUpdateflag() {
		return updateflag;
	}
	public void setUpdateflag(int updateflag) {
		this.updateflag = updateflag;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getSecondname() {
		return secondname;
	}
	public void setSecondname(String secondname) {
		this.secondname = secondname;
	}
	int secondid;
	 String methodname;
	 int methodid;
	 String standardname;
	 int standardid;
	 public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getQualificationid() {
		return qualificationid;
	}
	public void setQualificationid(int qualificationid) {
		this.qualificationid = qualificationid;
	}
	public String getFirstid() {
		return firstid;
	}
	public void setFirstid(String firstid) {
		this.firstid = firstid;
	}
	public int getSecondid() {
		return secondid;
	}
	public void setSecondid(int secondid) {
		this.secondid = secondid;
	}
	public String getMethodname() {
		return methodname;
	}
	public void setMethodname(String methodname) {
		this.methodname = methodname;
	}
	public int getMethodid() {
		return methodid;
	}
	public void setMethodid(int methodid) {
		this.methodid = methodid;
	}
	public String getStandardname() {
		return standardname;
	}
	public void setStandardname(String standardname) {
		this.standardname = standardname;
	}
	public int getStandardid() {
		return standardid;
	}
	public void setStandardid(int standardid) {
		this.standardid = standardid;
	}
	public String getTestproject() {
		return testproject;
	}
	public void setTestproject(String testproject) {
		this.testproject = testproject;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getRoleid() {
		return roleid;
	}
	String beforeuserid;
	String beforeroleid;
	String beforemethodname;
	public String getBeforeuserid() {
		return beforeuserid;
	}
	public void setBeforeuserid(String beforeuserid) {
		this.beforeuserid = beforeuserid;
	}
	public String getBeforeroleid() {
		return beforeroleid;
	}
	public void setBeforeroleid(String beforeroleid) {
		this.beforeroleid = beforeroleid;
	}
	 
	public String getBeforemethodname() {
		return beforemethodname;
	}
	public void setBeforemethodname(String beforemethodname) {
		this.beforemethodname = beforemethodname;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	String testproject;
	String testprojectid;
	 public String getTestprojectid() {
		return testprojectid;
	}
	public void setTestprojectid(String testprojectid) {
		this.testprojectid = testprojectid;
	}
	String userid;
	 String roleid; 
	 int datatype;
	 String typeid;
	public String getTypeid() {
		return typeid;
	}
	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
	public int getDatatype() {
		return datatype;
	}
	public void setDatatype(int datatype) {
		this.datatype = datatype;
	}
}
