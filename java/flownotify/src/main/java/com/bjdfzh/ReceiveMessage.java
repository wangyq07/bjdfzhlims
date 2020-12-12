package com.bjdfzh;

import java.util.List;

public class ReceiveMessage {

    private String rolename;
    private String msg;
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
    List<String> roleids;
	public List<String> getRoleids() {
		return roleids;
	}
	public void setRoleids(List<String> roleids) {
		this.roleids = roleids;
	}
     
}
