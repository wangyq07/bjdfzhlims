package com.bjdfzh.businessprocess.entity;

import java.util.Date;
import java.util.List;

import com.bjdfzh.userprivilage.entity.CommonType;

public class Sample {
	String id;
	String projectid;
	String samplename;
	String samplenumber;
	 CommonType testtype;
	 CommonType status;
	 CommonType store;
	 CommonType process;
	 String executestandard;
	 String executegrade;
	String samplequality;
	String samplespec;
	double samplevolume; 
	String sampledate;
	String manufactory;
	String manufactoryaddress;
	double purty;
	String brand;
	String manufactoryphone;
	Date manudate;
	Date deleverdate;
	public Date getManudate() {
		return manudate;
	}
	public void setManudate(Date manudate) {
		this.manudate = manudate;
	}
	public Date getDeleverdate() {
		return deleverdate;
	}
	public void setDeleverdate(Date deleverdate) {
		this.deleverdate = deleverdate;
	}
	String manuno;
	String  remark;
	int expiredday;
	double price;
	 double externprice;
	int domainid;
	String testproject;
	String methodname; 
	 public String getTesttypeother() {
		return testtypeother;
	}
	public void setTesttypeother(String testtypeother) {
		this.testtypeother = testtypeother;
	}
	public String getProcessother() {
		return processother;
	}
	public void setProcessother(String processother) {
		this.processother = processother;
	}
	public String getStoreother() {
		return storeother;
	}
	public void setStoreother(String storeother) {
		this.storeother = storeother;
	}
	public String getStatusother() {
		return statusother;
	}
	public void setStatusother(String statusother) {
		this.statusother = statusother;
	}
	String testtypeother;
	String processother;
	 String storeother;
	 String statusother;
	 String specialcondition;
	public String getSpecialcondition() {
		return specialcondition;
	}
	public void setSpecialcondition(String specialcondition) {
		this.specialcondition = specialcondition;
	}
	List<ContactTestProject> testprojects;
	public double getExternprice() {
		return externprice;
	}
	public void setExternprice(double externprice) {
		this.externprice = externprice;
	}
	public int getDomainid() {
		return domainid;
	}
	public void setDomainid(int domainid) {
		this.domainid = domainid;
	}
	
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	} 
	public String getProjectid() {
		return projectid;
	}
	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}
	public String getSamplename() {
		return samplename;
	}
	public void setSamplename(String samplename) {
		this.samplename = samplename;
	}
	public String getSamplenumber() {
		return samplenumber;
	}
	public void setSamplenumber(String samplenumber) {
		this.samplenumber = samplenumber;
	} 
	public String getSamplespec() {
		return samplespec;
	}
	public void setSamplespec(String samplespec) {
		this.samplespec = samplespec;
	}
	public double getSamplevolume() {
		return samplevolume;
	}
	public void setSamplevolume(double samplevolume) {
		this.samplevolume = samplevolume;
	} 
	public CommonType getTesttype() {
		return testtype;
	}
	public void setTesttype(CommonType testtype) {
		this.testtype = testtype;
	}
	public CommonType getStatus() {
		return status;
	}
	public void setStatus(CommonType status) {
		this.status = status;
	}
	public CommonType getStore() {
		return store;
	}
	public void setStore(CommonType store) {
		this.store = store;
	}
	public CommonType getProcess() {
		return process;
	}
	public void setProcess(CommonType process) {
		this.process = process;
	}
	public String getExecutestandard() {
		return executestandard;
	}
	public void setExecutestandard(String executestandard) {
		this.executestandard = executestandard;
	}
	public String getExecutegrade() {
		return executegrade;
	}
	public void setExecutegrade(String executegrade) {
		this.executegrade = executegrade;
	}
	public String getSamplequality() {
		return samplequality;
	}
	public void setSamplequality(String samplequality) {
		this.samplequality = samplequality;
	}
	public String getSampledate() {
		return sampledate;
	}
	public void setSampledate(String sampledate) {
		this.sampledate = sampledate;
	}
	public String getManufactory() {
		return manufactory;
	}
	public void setManufactory(String manufactory) {
		this.manufactory = manufactory;
	}
	public String getManufactoryaddress() {
		return manufactoryaddress;
	}
	public void setManufactoryaddress(String manufactoryaddress) {
		this.manufactoryaddress = manufactoryaddress;
	}
	public double getPurty() {
		return purty;
	}
	public void setPurty(double purty) {
		this.purty = purty;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getManufactoryphone() {
		return manufactoryphone;
	}
	public void setManufactoryphone(String manufactoryphone) {
		this.manufactoryphone = manufactoryphone;
	}
	 
     
	public String getManuno() {
		return manuno;
	}
	
	public void setManuno(String manuno) {
		this.manuno = manuno;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getExpiredday() {
		return expiredday;
	}
	public void setExpiredday(int expiredday) {
		this.expiredday = expiredday;
	}
	
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
	public List<ContactTestProject> getTestprojects() {
		return testprojects;
	}
	public void setTestprojects(List<ContactTestProject> testprojects) {
		this.testprojects = testprojects;
	}
	String wrapherproperties;
	public String getWrapherproperties() {
		return wrapherproperties;
	}
	public void setWrapherproperties(String wrapherproperties) {
		this.wrapherproperties = wrapherproperties;
	}
	double standardfee;
	public double getStandardfee() {
		return standardfee;
	}
	public void setStandardfee(double standardfee) {
		this.standardfee = standardfee;
	}
}
