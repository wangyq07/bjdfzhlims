package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.Qualification;
@Transactional
public interface QualificationMapper {
	List<Qualification> getqualifications(int id);
	List<Qualification> getqualificationsbycompany(String id,int companyid);
	List<Qualification> getqualificationsbyids(String ids); 
	Qualification getqualificationsbyid(int id);
	void updatequalification(Qualification quali);
	void addqualification(Qualification quali);
	void deletequalification(int id);
	List<Qualification> getqualificationsearch(String projectname,String methodname);
	List<Qualification> getqualificationsearchnon(String companyid,String projectname);
	Qualification getqualificaitonbycompanyidprojectid(String companyid,String testprojectid);
}
