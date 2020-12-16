package com.bjdfzh.flow.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.flow.entity.RoleDiscount;
@Transactional
public interface RoleDiscountMapper {
List<RoleDiscount>	getrolediscount();
RoleDiscount getrolediscountbyid(String domainid,String roleid);
void updaterolediscount(RoleDiscount rolediscount);
void addrolediscount(RoleDiscount rolediscount);
void deleteflownode(String domainid,String roleid);
}
