package com.bjdfzh.userprivilage.dao;

import java.util.List;

import com.bjdfzh.userprivilage.entity.Role;

public interface RoleMapper {
	 List<Role> getroles();
	 Role getrole(String id);
	 List<Role> getrolebyorg(String orgId);
	 void addrole(Role role);
	 void updaterole(Role role);
	 void deleterole(String id);
	 void deleteroleaction(String id);
	 void deleteroleuser(String id);
	}
