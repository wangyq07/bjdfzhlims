package com.bjdfzh.flow.entity;

import java.io.Serializable;
import java.util.List;

import com.bjdfzh.userprivilage.entity.Menu;
import com.bjdfzh.userprivilage.entity.Role;

public class TaskNode implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String id;
	public String getTasknodeid() {
		return tasknodeid;
	}
	public void setTasknodeid(String tasknodeid) {
		this.tasknodeid = tasknodeid;
	}
	String flowid;
	String label; 
	Menu menu ;
	String processkey;
	public String getProcesskey() {
		return processkey;
	}
	public void setProcesskey(String processkey) {
		this.processkey = processkey;
	}
	String tasknodeid;
	String handleclass;
	List<Role> roles;
	List<FlowSpecialDispatch> specialdispatch;
	public String getHandleclass() {
		return handleclass;
	}
	public void setHandleclass(String handleclass) {
		this.handleclass = handleclass;
	}
	public List<FlowSpecialDispatch> getSpecialdispatch() {
		return specialdispatch;
	}
	public void setSpecialdispatch(List<FlowSpecialDispatch> specialdispatch) {
		this.specialdispatch = specialdispatch;
	}
	public Menu getMenu() {
		return menu;
	}
	public void setMenu(Menu menu) {
		this.menu = menu;
	}
	public List<Role> getRoles() {
		return roles;
	}
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	String remark; 
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	} 
	 
	public String getFlowid() {
		return flowid;
	}
	public void setFlowid(String flowid) {
		this.flowid = flowid;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	 
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	} 
}
