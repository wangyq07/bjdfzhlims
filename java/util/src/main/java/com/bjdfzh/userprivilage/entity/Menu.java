package com.bjdfzh.userprivilage.entity;

import java.io.Serializable;

public class Menu implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String id;
	String  label;
	String  router;
	String icon;
	String pid;
	String path;
	Integer sort;
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
	public String getRouter() {
		return router;
	}
	public void setRouter(String router) {
		this.router = router;
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

}