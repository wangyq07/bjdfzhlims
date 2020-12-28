package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import com.bjdfzh.businessprocess.entity.TestStandard;
@Transactional
public interface TestStandardMapper {
	List<TestStandard>	getteststandards();
	void addTestStandard(TestStandard ts);
	void updateteststandard(TestStandard ts);
}
