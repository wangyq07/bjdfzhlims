package com.bjdfzh.businessprocess.dao;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.Customer;
@Transactional
public interface CustomerMapper {
List<Customer>	getcustomers(Map<String,Object> map);
Customer getcustomer(String id);
void addCustomer(Customer customer);
void updatecustomer(Customer customer);
void deletecustomer(String id);
}
