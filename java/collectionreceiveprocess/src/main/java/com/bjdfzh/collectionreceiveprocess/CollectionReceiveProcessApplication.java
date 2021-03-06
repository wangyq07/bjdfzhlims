package com.bjdfzh.collectionreceiveprocess;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement; 
 @SpringBootApplication
 @EnableTransactionManagement
 @EnableCaching
 @MapperScan("com.bjdfzh.collectionreceiveprocess.dao")
public class CollectionReceiveProcessApplication {
		public static void main(String[] args)
		{
			SpringApplication.run(CollectionReceiveProcessApplication.class, args);
		}
}
