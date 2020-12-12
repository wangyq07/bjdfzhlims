package com.bjdfzh.userprivilage.dao;
 import java.util.List;
import com.bjdfzh.userprivilage.entity.Organization;
public interface OrganizationMapper {
	Organization getone(String id); 
	List<Organization> getall();
	void update(Organization org);
	void updaterole(String id); 
	void deleteorguser(String id);
	void deleteorg(String id);
	void addorg(Organization org);
}

