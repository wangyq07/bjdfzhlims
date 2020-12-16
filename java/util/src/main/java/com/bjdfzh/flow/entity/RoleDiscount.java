package com.bjdfzh.flow.entity;

 
import java.io.Serializable;

import com.bjdfzh.userprivilage.entity.Role;

public class RoleDiscount implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
String id;
String pid; 
String label;
Role role;
public Role getRole() {
	return role;
}
public void setRole(Role role) {
	this.role = role;
}
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
public double getDiscount() {
	return discount;
}
public void setDiscount(double discount) {
	this.discount = discount;
}
double discount;
 
}
