package com.bjdfzh.userprivilage.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.userprivilage.entity.Menu;
@Transactional
public interface MenuMapper {
List<Menu> getmenus(); 
Menu getmenu(String id);
void updatemenu(Menu menu); 
void deletemenu(String id);
void addmenu(Menu menu);
}
