package com.bjdfzh.userprivilage.entity;

public class RelationId {
	 String  left;
	 public RelationId(String leftid,String rightid)
	 {
		 this.left=leftid;
		 this.right=rightid;
	 }
	 public String getLeft() {
		return left;
	}
	public void setLeft(String left) {
		this.left = left;
	}
	public String getRight() {
		return right;
	}
	public void setRight(String right) {
		this.right = right;
	}
	String  right;
	}
