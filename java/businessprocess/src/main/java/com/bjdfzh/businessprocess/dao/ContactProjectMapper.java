package com.bjdfzh.businessprocess.dao;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactTestProject;
import com.bjdfzh.businessprocess.entity.Sample;
@Transactional
public interface ContactProjectMapper {
List<ContactProject>	getcontactprojects(Map<String,Object> map);
  ContactProject	getcontactproject(String id);
 void addcontactprojects(List<ContactProject> contact); 
 void updatecontactproject(ContactProject contact);
 void deleteproject(String id);
 void deletecontacttestbyproject(String id);
 void deletesamplebyproject(String id);
 void deletecustomer(String id);
 void deletesamplebyprojectinfos(String ids);
 void addcontactprojectinfos(List<ContactProject> contactinfos);
}
