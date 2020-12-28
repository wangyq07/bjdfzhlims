package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.PriceProduct;
import com.bjdfzh.businessprocess.entity.PriceQualification;
@Service
@Transactional
public interface PriceProductMapper {
List<PriceProduct>	getpriceproduct();
PriceProduct getpriceproductbyid(String id);
void addpriceproduct(PriceProduct product);
void addpricequalification(List<PriceQualification> prices);
void deletepriceproduct(String id);
void deletepricequalification(String id);
void updatepriceproduct(PriceProduct product);
}
