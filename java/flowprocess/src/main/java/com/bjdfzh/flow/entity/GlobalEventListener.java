package com.bjdfzh.flow.entity;

import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.delegate.event.ActivitiEvent;
import org.activiti.engine.delegate.event.ActivitiEventListener;
import org.activiti.engine.delegate.event.ActivitiEventType;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GlobalEventListener implements ActivitiEventListener {
    protected Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * 各类 Event 的处理器
     */
    private Map<ActivitiEventType, ActivitiEventHandler> handlers = new HashMap<ActivitiEventType, ActivitiEventHandler>();



    @Override
    public void onEvent(ActivitiEvent event) {
    	ActivitiEventHandler eventHandler = handlers.get(event.getType());
        if(eventHandler!=null){
        	eventHandler.handle(event); 
        }
    }

    @Override
    public boolean isFailOnException() {
        return false;
    }

    public Map<ActivitiEventType, ActivitiEventHandler> getHandlers() {
        return handlers;
    }

    public void setHandlers(Map<ActivitiEventType, ActivitiEventHandler> handlers) {
        this.handlers = handlers;
    }
}
