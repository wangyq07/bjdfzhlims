package com.bjdfzh.collectionreceiveprocess.entity;

public class DispatchRoleTask {
	
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTestid() {
		return testid;
	}
	public void setTestid(String testid) {
		this.testid = testid;
	}
	public String getSampleid() {
		return sampleid;
	}
	public void setSampleid(String sampleid) {
		this.sampleid = sampleid;
	}
	public String getReceivequality() {
		return receivequality;
	}
	public void setReceivequality(String receivequality) {
		this.receivequality = receivequality;
	}
	public String getScreendiameter() {
		return screendiameter;
	}
	public void setScreendiameter(String screendiameter) {
		this.screendiameter = screendiameter;
	}
	String  id; 
	String roleid;
	String testid;
	String  sampleid;
	String receivequality; 
	String screendiameter;
	String remark;
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
