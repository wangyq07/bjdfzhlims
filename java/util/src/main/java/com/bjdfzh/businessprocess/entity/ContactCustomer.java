package com.bjdfzh.businessprocess.entity;

public class ContactCustomer {
	String id;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	String contactid ;
	int customerid;
	String customername;
	String area; 
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	 
	public String getContactid() {
		return contactid;
	}
	public void setContactid(String contactid) {
		this.contactid = contactid;
	}
	public int getCustomerid() {
		return customerid;
	}
	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
	public String getCustomername() {
		return customername;
	}
	public void setCustomername(String customername) {
		this.customername = customername;
	}
	public int getCustomertype() {
		return customertype;
	}
	public void setCustomertype(int customertype) {
		this.customertype = customertype;
	}
	int customertype; 
}
