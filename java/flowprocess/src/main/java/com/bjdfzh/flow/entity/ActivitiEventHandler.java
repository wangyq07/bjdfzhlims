package com.bjdfzh.flow.entity;

import org.activiti.engine.delegate.event.ActivitiEvent;

public interface  ActivitiEventHandler {
    void handle(ActivitiEvent event);
}  