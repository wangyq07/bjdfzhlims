package com.bjdfzh.userprivilage;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement; 
//dbconfig.properties
@SpringBootApplication
@EnableTransactionManagement
@MapperScan("package com.bjdfzh.userprivilage.dao")
public class UserPrivilageApplication {
  public static void main(String[] args)
  {
	  SpringApplication.run(UserPrivilageApplication.class, args);
  }
}

