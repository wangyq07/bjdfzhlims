package com.bjdfzh.userprivilage.entity;

import java.util.List;

public class AuthUser {
	String id;
	String account;
	String password;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	 
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public List<Organization> getOrganizations() {
		return organizations;
	}
	public void setOrganizations(List<Organization> organizations) {
		this.organizations = organizations;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Action> getActions() {
		return actions;
	}
	public void setActions(List<Action> actions) {
		this.actions = actions;
	}
	public List<Menu> getMenus() {
		return menus;
	}
	public void setMenus(List<Menu> menus) {
		this.menus = menus;
	}
	String email;
	public List<Role> getRoles() {
		return roles;
	}
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	String phone;
	String name;
	List<Action> actions;
	List<Menu> menus;
	List<Organization> organizations;
	List<Role> roles;
	 
}
