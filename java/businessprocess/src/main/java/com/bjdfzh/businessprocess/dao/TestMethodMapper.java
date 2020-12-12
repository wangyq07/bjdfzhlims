package com.bjdfzh.businessprocess.dao;

import java.util.List;

import com.bjdfzh.businessprocess.entity.TestMethod;

public interface TestMethodMapper {
	List<TestMethod>	gettestprojects();
	void addTestMethod(TestMethod tm);
}
