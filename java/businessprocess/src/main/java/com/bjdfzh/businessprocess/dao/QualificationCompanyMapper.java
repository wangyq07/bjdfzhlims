package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.QualificationCompany;
@Transactional
public interface QualificationCompanyMapper {
	List<QualificationCompany> getqualificationcompanys(); 
	List<QualificationCompany>  getallqualificationcompanys();
	QualificationCompany getqualificationcompanybyname(String name);
	void addcompany(QualificationCompany company);
	
}
