package com.bjdfzh.userprivilage.dao;

import java.util.List;

import com.bjdfzh.userprivilage.entity.Action;
import com.bjdfzh.userprivilage.entity.RelationId;

public interface ActionMapper {
	  List<Action> getactions();
	  Action getaction(String id);
	 List<Action> getactionbymenu(String menuId);
	 List<Action> getactionbymenurole(String menuId,String roleId);
	 void addaction(Action action);
	 void deleteaction(String Id); 
	 void addroleactionmap(List<RelationId> relationIds);
	 void deleteroleactionmap(String menuId,String roleId);
	 void deleteactionbymenu(String menuId);
	 void deleteroleactionmapbymenu(String menuId);
}
