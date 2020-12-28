package com.bjdfzh.businessprocess.entity;

import java.io.Serializable;
import java.util.List;

public class PriceProduct implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		String id;
		String pid ;
		String label ;
		double limitprice;
		int mincount;
		double perdecreace;
		 
		public int getMincount() {
			return mincount;
		}
		public void setMincount(int mincount) {
			this.mincount = mincount;
		}
		public double getPerdecreace() {
			return perdecreace;
		}
		public void setPerdecreace(double perdecreace) {
			this.perdecreace = perdecreace;
		}
		public double getLimitprice() {
			return limitprice;
		}
		public void setLimitprice(double limitprice) {
			this.limitprice = limitprice;
		}
		public String getLabel() {
			return label;
		}
		public void setLabel(String label) {
			this.label = label;
		}
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
		 
		public String getFormular() {
			return formular;
		}
		public void setFormular(String formular) {
			this.formular = formular;
		}
		public List<PriceQualification> getPrices() {
			return prices;
		}
		public void setPrices(List<PriceQualification> prices) {
			this.prices = prices;
		}
		String formular ;
		List<PriceQualification> prices  ;
}
