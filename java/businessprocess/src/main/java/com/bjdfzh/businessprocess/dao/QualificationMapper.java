package com.bjdfzh.businessprocess.dao;

import java.util.List;

import com.bjdfzh.businessprocess.entity.Qualification;

public interface QualificationMapper {
	List<Qualification> getqualifications(int id);
	List<Qualification> getqualificationsbycompany(int id,int companyid);
	List<Qualification> getqualificationsbyids(String ids); 
	void addqualification(Qualification quali);
}
