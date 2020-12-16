package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.TestProject;
@Transactional
public interface TestProjectMapper {
List<TestProject>	gettestprojects();
void addtestProject(TestProject tp);
 
}
