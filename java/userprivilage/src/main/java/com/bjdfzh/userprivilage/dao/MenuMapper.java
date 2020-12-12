package com.bjdfzh.userprivilage.dao;

import java.util.List;

import com.bjdfzh.userprivilage.entity.Menu;

public interface MenuMapper {
List<Menu> getmenus(); 
Menu getmenu(String id);
void updatemenu(Menu menu); 
void deletemenu(String id);
void addmenu(Menu menu);
}
