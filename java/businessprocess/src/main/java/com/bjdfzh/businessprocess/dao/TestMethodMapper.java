package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.TestMethod;
@Transactional
public interface TestMethodMapper {
	List<TestMethod>	gettestprojects();
	void addTestMethod(TestMethod tm);
}
