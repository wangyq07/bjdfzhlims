package com.bjdfzh.flow.entity; 
 
import com.bjdfzh.userprivilage.entity.Role;

public class RoleAuditSetting {
 String id;
 String pid;
 String label;
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
public Role getRole() {
	return role;
}
public void setRole(Role role) {
	this.role = role;
}
public String getAuditjson() {
	return auditjson;
}
public void setAuditjson(String auditjson) {
	this.auditjson = auditjson;
}
Role role;
 String auditjson;
}
