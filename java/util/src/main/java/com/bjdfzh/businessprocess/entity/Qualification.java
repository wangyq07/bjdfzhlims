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
String testprojectid;
  int methodid;
  int projectsort;
  String testproject;
  public String getTestprojectid() {
	return testprojectid;
}
public void setTestprojectid(String testprojectid) {
	this.testprojectid = testprojectid;
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
String methodname;
  int testcount=1; 
  public int getTestcount() {
	return testcount;
}
public void setTestcount(int testcount) {
	this.testcount = testcount;
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
  int firstid;
  String firstname; 
  int secondid;
  String secondname;
  String standardid;
  String standardname;
public String getStandardid() {
	return standardid;
}
public void setStandardid(String standardid) {
	this.standardid = standardid;
}
public String getStandardname() {
	return standardname;
}
public void setStandardname(String standardname) {
	this.standardname = standardname;
}
public int getFirstid() {
	return firstid;
}
public void setFirstid(int firstid) {
	this.firstid = firstid;
}
 
public int getSecondid() {
	return secondid;
}
public void setSecondid(int secondid) {
	this.secondid = secondid;
}
 
}
