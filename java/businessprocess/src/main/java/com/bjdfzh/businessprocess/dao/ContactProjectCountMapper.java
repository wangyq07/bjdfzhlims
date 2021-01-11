package com.bjdfzh.businessprocess.dao;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.ContactProjectCount;
@Transactional
public interface ContactProjectCountMapper {
	ContactProjectCount getprojectmaxcount(String begindate,String enddate);
}
