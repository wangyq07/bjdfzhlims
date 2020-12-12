package com.bjdfzh.userprivilage.entity;

public class Organization {
	 public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	 
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	String  id; 
	 String label ;
	 String type;
	 String icon;
	 String pid;
	 String path;
	 Integer sort;
	 Integer checkprice;
	public Integer getCheckprice() {
		return checkprice;
	}
	public void setCheckprice(Integer checkprice) {
		this.checkprice = checkprice;
	}
}

