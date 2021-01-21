package com.bjdfzh.flow.entity;

import java.io.Serializable;

import com.bjdfzh.userprivilage.entity.Role;

@SuppressWarnings("serial")
public class FlowSpecialDispatch implements Serializable {
	String id;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	String flowid;
	 String tasknodeid ; 
	 int conditionid ;
	 String conditionname;
	 public String getFlowid() {
		return flowid;
	}
	public void setFlowid(String flowid) {
		this.flowid = flowid;
	}
	 
	public String getTasknodeid() {
		return tasknodeid;
	}
	public void setTasknodeid(String tasknodeid) {
		this.tasknodeid = tasknodeid;
	}
	public int getConditionid() {
		return conditionid;
	}
	public void setConditionid(int conditionid) {
		this.conditionid = conditionid;
	}
	public String getConditionname() {
		return conditionname;
	}
	public void setConditionname(String conditionname) {
		this.conditionname = conditionname;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getConditionstring() {
		return conditionstring;
	}
	public void setConditionstring(String conditionstring) {
		this.conditionstring = conditionstring;
	}
	Role role; 
	 String conditionstring ;
 
}
