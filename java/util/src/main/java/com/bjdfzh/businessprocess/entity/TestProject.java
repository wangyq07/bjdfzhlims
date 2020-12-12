package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

public class TestProject  implements Serializable {
	 
	/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
String id;
String pid;
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getPid() {
	return pid;
}
public void setPid(String pid) {
	this.pid = pid;
}
public String getLabel() {
	return label;
}
public void setLabel(String label) {
	this.label = label;
}
String label;
int level;
public int getLevel() {
	return level;
}
public void setLevel(int level) {
	this.level = level;
}
}
