package com.bjdfzh.userprivilage.dao;

import java.util.List;

import com.bjdfzh.userprivilage.entity.User;

public interface UserMapper {
	 List< User> getallUser();
	 List< User> getuserbyorgnization(String orgId);
	 User getUserById(String id);
	 void addUser(User user);
	 void update(User user);
	 void detete(String id);
}
