package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

@SuppressWarnings("serial")
public class TestMethod  implements  Serializable {
int id;
String Methodname;
 
 
public String getMethodname() {
	return Methodname;
}
public void setMethodname(String methodname) {
	Methodname = methodname;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
 
public String getRemark() {
	return remark;
}
public void setRemark(String remark) {
	this.remark = remark;
}
String remark;
}
