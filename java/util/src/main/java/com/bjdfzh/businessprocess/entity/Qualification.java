package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

public class Qualification implements  Serializable {
  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
int id;
  public int getId() {
	return id;
}
 int companyid;
public int getCompanyid() {
	return companyid;
}
public void setCompanyid(int companyid) {
	this.companyid = companyid;
}
public void setId(int id) {
	this.id = id;
}
int testprojectid;
  int methodid;
  int projectsort;
  String testproject;
  String methodname;
  int testcount=1; 
  public int getTestcount() {
	return testcount;
}
public void setTestcount(int testcount) {
	this.testcount = testcount;
}
public int getTestprojectid() {
	return testprojectid;
}
public void setTestprojectid(int testprojectid) {
	this.testprojectid = testprojectid;
}
public int getMethodid() {
	return methodid;
}
public void setMethodid(int methodid) {
	this.methodid = methodid;
}
public int getProjectsort() {
	return projectsort;
}
public void setProjectsort(int projectsort) {
	this.projectsort = projectsort;
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
public int getMethodsort() {
	return methodsort;
}
public void setMethodsort(int methodsort) {
	this.methodsort = methodsort;
}
public String getLimitcomment() {
	return limitcomment;
}
public void setLimitcomment(String limitcomment) {
	this.limitcomment = limitcomment;
}
public double getPrice() {
	return price;
}
public void setPrice(double price) {
	this.price = price;
}
int methodsort;
  String limitcomment;
  double price;
}
