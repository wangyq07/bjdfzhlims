package com.bjdfzh.businessprocess.dao;

import java.util.List;

import com.bjdfzh.businessprocess.entity.Customer;

public interface CustomerMapper {
List<Customer>	getcustomers(String userid);
Customer getcustomer(String id);
void addCustomer(Customer customer);
void updatecustomer(Customer customer);
void deletecustomer(String id);
}
