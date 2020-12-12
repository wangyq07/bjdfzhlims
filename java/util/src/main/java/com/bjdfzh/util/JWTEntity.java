package com.bjdfzh.util;

import java.util.Date;

public class JWTEntity {
	 String userId;
	 String password;
	 String userName;
	 Date loginDate;
	 long maxege;
	public String getUserId() {
		return userId;
	}
	public long getMaxege() {
		return maxege;
	}
	public void setMaxege(long maxege) {
		this.maxege = maxege;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getLoginDate() {
		return loginDate;
	}
	public void setLoginDate(Date loginDate) {
		this.loginDate = loginDate;
	}
	}

