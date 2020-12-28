package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;
import java.util.List;

@SuppressWarnings("serial")
public class Product implements Serializable {
	String id;
	String pid;
	String label ;
   double price  ;
   List<ProductQualification> testprojects;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getPid() {
			return pid;
		}
		public void setPid(String pid) {
			this.pid = pid;
		}
		public String getLabel() {
			return label;
		}
		public void setLabel(String label) {
			this.label = label;
		}
		public double getPrice() {
			return price;
		}
		public void setPrice(double price) {
			this.price = price;
		}
		public List<ProductQualification> getTestprojects() {
			return testprojects;
		}
		public void setTestprojects(List<ProductQualification> testprojects) {
			this.testprojects = testprojects;
		}
}
