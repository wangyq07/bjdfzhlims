package com.bjdfzh.businessprocess.dao;

import java.util.List;

import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactTestProject;
import com.bjdfzh.businessprocess.entity.Sample;

public interface ContactProjectMapper {
List<ContactProject>	getcontactprojects(String contactid);
  ContactProject	getcontactproject(String id);
 void addcontactprojects(List<ContactProject> contact); 
 void updatecontactproject(ContactProject contact);
 void deleteproject(String id);
 void deletecontacttestbyproject(String id);
 void deletesamplebyproject(String id);
 void deletecustomer(String id);
}
