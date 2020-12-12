package com.bjdfzh.flow.entity;

import org.activiti.engine.delegate.event.ActivitiEvent;

public class ActivitiEventHandlerImp implements ActivitiEventHandler{

	@Override
	public void handle(ActivitiEvent event) {
		// TODO 自动生成的方法存根
		System.out.print(event.getProcessDefinitionId() );
	}

}
