package com.bjdfzh.userprivilage.entity;

import java.io.Serializable;

public class Role implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String id;
	String name;
	String organizationId;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOrganizationId() {
		return organizationId;
	}
	public void setOrganizationId(String organizationId) {
		this.organizationId = organizationId;
	}

}

