package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.bjdfzh.businessprocess.entity.Contact;
import com.bjdfzh.businessprocess.entity.ContactCustomer;
import com.bjdfzh.businessprocess.entity.ContactProject;
import com.bjdfzh.businessprocess.entity.ContactProjectCount;
import com.bjdfzh.businessprocess.entity.ContactSeal;
@Transactional
public interface ContactMapper {
List<Contact> getcontactbycustomer(int customerid,String userid);
JSONArray getcontactjsonobject(int customerid);
void addcontact(Contact cotact);
void updatecontact(Contact cotact);
void deletecontact(String id);
Contact getcontactbyid(String id); 
void addtempcustomer(Contact cotact);
void deletecontacttestproject(String id);
void deletesamplebycontact(String id);
void deletecontactproject(String id);
void deletecontactcustomer(String id); 
void addcustomers(List<ContactCustomer> customers);
void deletecontactseal(String id);
void addseals(List<ContactSeal> seals);
void deletecontactinfo(String id);
void addcontactinfo(Contact contact);
void updatecontactstandardfee(Contact contact);
void updateprpjectnumbers(List<ContactProject> Projects);

}
