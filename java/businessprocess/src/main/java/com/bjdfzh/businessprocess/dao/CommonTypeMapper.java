package com.bjdfzh.businessprocess.dao;

import java.util.List; 
 
import com.bjdfzh.businessprocess.entity.ServiceType;
import com.bjdfzh.userprivilage.entity.CommonType; 
public interface CommonTypeMapper {
	List<CommonType> getdomains();
	List<CommonType> getsteals();
	List<CommonType> getreceivesampleform();
	List<ServiceType> getservicetype();
}
