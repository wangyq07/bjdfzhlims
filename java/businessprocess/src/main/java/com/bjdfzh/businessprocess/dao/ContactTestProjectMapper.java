package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.ContactTestProject;
@Transactional
public interface ContactTestProjectMapper {
	void addcontactprojects(List<ContactTestProject> testprojects);
	void deleteproject(String id,String sampleid);
	void updateproject(String id,String sampleid);
	void deletecontactproject(String id);
	void deleteprojectbysample(String sampleid);
	List<ContactTestProject> getcontacttestprojects(String id,String sampleid);
}
