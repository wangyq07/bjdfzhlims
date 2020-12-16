package com.bjdfzh.flow.dao; 
import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.flow.entity.ProjectContactCustomer;
@Transactional
public interface ProjectContactCustomerMapper {
 ProjectContactCustomer 	getitembyid(String contactid);
}
