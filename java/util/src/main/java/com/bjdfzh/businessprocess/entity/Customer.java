package com.bjdfzh.businessprocess.entity;

public class Customer {
	int id;
	String customername;
	String userid;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCustomername() {
		return customername;
	}
	public void setCustomername(String customername) {
		this.customername = customername;
	}
	public String getCustomeraddress() {
		return customeraddress;
	}
	public void setCustomeraddress(String customeraddress) {
		this.customeraddress = customeraddress;
	}
	 
	public CustomerType getCustomertype() {
		return customertype;
	}
	public void setCustomertype(CustomerType customertype) {
		this.customertype = customertype;
	}
	public String getContacter() {
		return contacter;
	}
	public void setContacter(String contacter) {
		this.contacter = contacter;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	String customeraddress;
	 	CustomerType customertype;
	 int functiontype=1;
	public int getFunctiontype() {
		return functiontype;
	}
	public void setFunctiontype(int functiontype) {
		this.functiontype = functiontype;
	}
	String contacter;
	String phone;
	String fax;
	String postcode;
	String email;
	String remark; 
	String area;
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
}
