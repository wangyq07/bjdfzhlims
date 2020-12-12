package com.bjdfzh;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication 
(exclude = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
        org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class
}
)
@EnableCaching
@MapperScan("package com.bjdfzh.flow.dao")
public class FlowProcessApplication {
	public static void main(String[] args)
	{
	 SpringApplication.run(FlowProcessApplication.class, args);
	}
}
