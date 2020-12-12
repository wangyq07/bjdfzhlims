package com.bjdfzh.businessprocess;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
@MapperScan("com.bjdfzh.businessprocess.dao")
public class BusinessProcessApplication {
	public  static void  main(String[] args)
	{
		SpringApplication.run(BusinessProcessApplication.class, args);
	}
}
