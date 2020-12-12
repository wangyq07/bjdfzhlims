package com.bjdfzh.businessprocess.entity;

public class ServiceType {
		int id;
		String label;
		  double discount;
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
		public double getDiscount() {
			return discount;
		}
		public void setDiscount(double discount) {
			this.discount = discount;
		}
		public String getRemark() {
			return remark;
		}
		public void setRemark(String remark) {
			this.remark = remark;
		}
		String remark;
}
