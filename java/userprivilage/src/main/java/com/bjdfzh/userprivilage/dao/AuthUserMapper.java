package com.bjdfzh.userprivilage.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.userprivilage.entity.AuthUser;
import com.bjdfzh.userprivilage.entity.RelationId;
@Transactional
public interface AuthUserMapper {
	 AuthUser getauth(String account);
	 AuthUser getauthbyid(String id);
	 List<AuthUser> getallUserOrg();
	 List<AuthUser> getuserbyorgnization(String orgId); 
	 void addUserOrg(List<RelationId> relations);
	 void addUserRole(List<RelationId> relations);
	 void deleteUserOrg(String leftid);
	 void deleteUserRole(String leftid);
	 void deleteUser(String id);
	 List<AuthUser> getauditcustomuservice();
	}
