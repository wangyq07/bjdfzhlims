package com.bjdfzh.userprivilage.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.userprivilage.entity.Role;
@Transactional
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
