package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

@SuppressWarnings("serial")
public class TestStandard  implements  Serializable {
String id;
String standardname;
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getStandardname() {
	return standardname;
}
public void setStandardname(String standardname) {
	this.standardname = standardname;
}
public String getRemark() {
	return remark;
}
public void setRemark(String remark) {
	this.remark = remark;
}
String remark;
}
