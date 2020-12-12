package com.bjdfzh;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.sun.istack.logging.Logger;

@Controller
public class WebSocketController {
	@Autowired
    public SimpMessagingTemplate template;  
      static Logger LOGGER=Logger.getLogger(WebSocketController.class);
    
    @MessageMapping("/subscribe")
    public void subscribe(ReceiveMessage rm) {
    	//广播使用convertAndSend方法，第一个参数为目的地，和js中订阅的目的地要一致
        
        try {
        	template.convertAndSend("/topic/getResponse", rm);
        	LOGGER.info(rm.getMsg());
	        } catch (Exception e) {
	            LOGGER.info(String.format("websocket处理异常:%s", e.getMessage()));
	        }
        /*for(int i =1;i<=20;i++) {
            
           
        }*/

    }
    
    @MessageMapping("/queue")
    public void queuw(ReceiveMessage rm) { 
            template.convertAndSendToUser(rm.getRolename(),"/message",rm); 
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }  
    }


}
