package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

@SuppressWarnings("serial")
public class PriceQualification implements Serializable {
	String id;
	String qualificationid ;
   String priceid ;
   String  testprojectname ;
   String methodname ;
   String standardprice ;
   double exceptionprice;
public double getExceptionprice() {
	return exceptionprice;
}
public void setExceptionprice(double exceptionprice) {
	this.exceptionprice = exceptionprice;
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
public String getPriceid() {
	return priceid;
}
public void setPriceid(String priceid) {
	this.priceid = priceid;
}
public String getTestprojectname() {
	return testprojectname;
}
public void setTestprojectname(String testprojectname) {
	this.testprojectname = testprojectname;
}
public String getMethodname() {
	return methodname;
}
public void setMethodname(String methodname) {
	this.methodname = methodname;
}
public String getStandardprice() {
	return standardprice;
}
public void setStandardprice(String standardprice) {
	this.standardprice = standardprice;
}
}
