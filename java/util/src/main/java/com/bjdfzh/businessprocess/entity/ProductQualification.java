package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ProductQualification implements Serializable  {
	String id;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	String qualificationid ;
   String productid ;
   String testprojectname ;
   String standardname;
    public String getStandardname() {
	return standardname;
}
public void setStandardname(String standardname) {
	this.standardname = standardname;
}
	public String getQualificationid() {
	    return qualificationid;
		}
		public void setQualificationid(String qualificationid) {
			this.qualificationid = qualificationid;
		}
		public String getProductid() {
			return productid;
		}
		public void setProductid(String productid) {
			this.productid = productid;
		}
		public String getTestprojectname() {
			return testprojectname;
		}
		public void setTestprojectname(String testprojectname) {
			this.testprojectname = testprojectname;
		}
		public String getMethodname() {
			return methodname;
		}
		public void setMethodname(String methodname) {
			this.methodname = methodname;
		}
		public double getStandardprice() {
			return standardprice;
		}
		public void setStandardprice(double standardprice) {
			this.standardprice = standardprice;
		}
		String methodname ;
		   double standardprice ;
}
