package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.ServiceType;
import com.bjdfzh.userprivilage.entity.CommonType; 
@Transactional
public interface CommonTypeMapper {
	List<CommonType> getdomains();
	List<CommonType> getseals();
	List<CommonType> getreceivesampleform(); 
	List<CommonType> getsamplestatus();
	List<CommonType> getsamplestore();
	List<CommonType> getsampleprocess();
	List<CommonType> getsampletesttype();
   List<ServiceType>	getservicetype();
  List<CommonType> getspecialdispatchspecial(String code);
}
