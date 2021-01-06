package com.bjdfzh.collectionreceiveprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.collectionreceiveprocess.entity.DispatchRoleTask;
import com.bjdfzh.collectionreceiveprocess.entity.RoleTestProject; 
@Transactional
public interface DispatchRoleTaskMapper {
List<RoleTestProject>	getroletaskdispatch();
void addtaskdispatchs(List<DispatchRoleTask> tasks);
void deletedispatchtask(String contactid);
}
