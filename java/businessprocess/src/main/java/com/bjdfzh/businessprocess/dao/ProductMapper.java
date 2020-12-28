package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; 
import com.bjdfzh.businessprocess.entity.Product;
import com.bjdfzh.businessprocess.entity.ProductQualification;

@Service
@Transactional
public interface ProductMapper {
	List<Product>	getproduct();
	 Product getproductbyid(String id);
	List<Product> searchproduct(String serach);
	void addproduct(Product product);
	void addproductqualification(List<ProductQualification> testprojects);
	void deleteproduct(String id);
	void deleteproductqualification(String id);
	void updateproduct(Product product);
}
