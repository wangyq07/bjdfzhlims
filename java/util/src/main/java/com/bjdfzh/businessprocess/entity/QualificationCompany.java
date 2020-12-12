package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

public class QualificationCompany implements Serializable {
 
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
int id;
String label;
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getLabel() {
	return label;
}
public void setLabel(String label) {
	this.label = label;
}

}
