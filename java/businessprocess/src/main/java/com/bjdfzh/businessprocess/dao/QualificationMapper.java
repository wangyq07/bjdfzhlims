package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.Qualification;
@Transactional
public interface QualificationMapper {
	List<Qualification> getqualifications(int id);
	List<Qualification> getqualificationsbycompany(int id,int companyid);
	List<Qualification> getqualificationsbyids(String ids); 
	void addqualification(Qualification quali);
}
