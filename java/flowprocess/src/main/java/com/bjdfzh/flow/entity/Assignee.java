package com.bjdfzh.flow.entity;

import com.alibaba.fastjson.JSONObject;

public class Assignee {
 String assigneeName;
 int type;
 JSONObject  object;
public String getAssigneeName() {
	return assigneeName;
}
public void setAssigneeName(String assigneeName) {
	this.assigneeName = assigneeName;
}
public int getType() {
	return type;
}
public void setType(int type) {
	this.type = type;
}
public JSONObject getObject() {
	return object;
}
public void setObject(JSONObject object) {
	this.object = object;
}
}
