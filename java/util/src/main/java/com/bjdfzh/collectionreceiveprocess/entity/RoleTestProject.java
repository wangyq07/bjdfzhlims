package com.bjdfzh.collectionreceiveprocess.entity;

import java.util.ArrayList;
import java.util.List; 

public class RoleTestProject {
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
 
public List<DispatchRoleTask> getTaskdispatchs() {
	return taskdispatchs;
}
public void setTaskdispatchs(List<DispatchRoleTask> taskdispatchs) {
	this.taskdispatchs = taskdispatchs;
}
public String getLabel() {
	return label;
}
public void setLabel(String label) {
	this.label = label;
}
 
String label;
List<DispatchRoleTask> taskdispatchs;
  
}
