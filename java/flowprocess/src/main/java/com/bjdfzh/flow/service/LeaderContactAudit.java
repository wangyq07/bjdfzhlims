package com.bjdfzh.flow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.flow.dao.HandleMultiInstance;
import com.bjdfzh.flow.entity.Assignee;
@Service
public class LeaderContactAudit implements HandleMultiInstance {

	@Override
	public List<Assignee> HandleAssignee(JSONObject Param) {
		// TODO 自动生成的方法存根
		List<Assignee> retassignee=new ArrayList<>();
		
		return retassignee;
	}

}
