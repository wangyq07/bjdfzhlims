package com.bjdfzh.businessprocess.entity;

import java.util.ArrayList;
import java.util.List;

import com.bjdfzh.userprivilage.entity.CommonType;

public class Contact {
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContactversion() {
		return contactversion;
	}
	public void setContactversion(String contactversion) {
		this.contactversion = contactversion;
	}
	 
	public String getSigndate() {
		return signdate;
	}
	public void setSigndate(String signdate) {
		this.signdate = signdate;
	} 
 
	public int getIsjudgement() {
		return isjudgement;
	}
	public void setIsjudgement(int isjudgement) {
		this.isjudgement = isjudgement;
	}
	public String getJudgementstandard() {
		return judgementstandard;
	}
	public void setJudgementstandard(String judgementstandard) {
		this.judgementstandard = judgementstandard;
	}
	public String getExcutegrade() {
		return excutegrade;
	}
	public void setExcutegrade(String excutegrade) {
		this.excutegrade = excutegrade;
	} 
	public double getTestfee() {
		return testfee;
	}
	public void setTestfee(double testfee) {
		this.testfee = testfee;
	}
 
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	String id;
	String contactversion; 
	 String userid;
	String signdate; 
	int projectmaxcount;
	public int getProjectmaxcount() {
		return projectmaxcount;
	}
	public void setProjectmaxcount(int projectmaxcount) {
		this.projectmaxcount = projectmaxcount;
	}
	public List<CommonType> getSeal() {
		 
		return seal;
	}
	public void setSeal(List<CommonType> seal) {
		
		this.seal = seal;
	}
	public CommonType getService() {
		if(service==null)
		{
			service=new CommonType();
			service.setId(1);
			service.setLabel("标准服务");
		}
		return service;
	}
	public void setService(CommonType service) {
		this.service = service;
	}
	public List<ContactCustomer> getContactcustomers() { 
		return contactcustomers;
	}
	public void setContactcustomers(List<ContactCustomer> contactcustomers) {
		this.contactcustomers = contactcustomers;
	}
	public double getStandardfee() {
		return standardfee;
	}
	public void setStandardfee(double standardfee) {
		this.standardfee = standardfee;
	}
	public double getTotalfee() {
		return totalfee;
	}
	public void setTotalfee(double totalfee) {
		this.totalfee = totalfee;
	}
	public double getCollectionfee() {
		return collectionfee;
	}
	public void setCollectionfee(double collectionfee) {
		this.collectionfee = collectionfee;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	int isjudgement;
	String judgementstandard;
	String excutegrade;
	List<CommonType> seal;
	CommonType service;
	CommonType samplesource;
	String customerid;
	 public String getCustomerid() {
		return customerid;
	}
	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}
	public CommonType getSamplesource() {
		return samplesource;
	}
	public void setSamplesource(CommonType samplesource) {
		this.samplesource = samplesource;
	}
	List<ContactCustomer> contactcustomers;
	double testfee;
	double standardfee;
    double totalfee;
    double collectionfee; 
    double discount;
	String remark;
	double businessfee;
	double externfee;
	String ugency;
	public String getUgency() {
		return ugency;
	}
	public void setUgency(String ugency) {
		this.ugency = ugency;
	}
	public double getBusinessfee() {
		return businessfee;
	}
	public void setBusinessfee(double businessfee) {
		this.businessfee = businessfee;
	}
	public double getExternfee() {
		return externfee;
	}
	public void setExternfee(double externfee) {
		this.externfee = externfee;
	}
    
	 

}
