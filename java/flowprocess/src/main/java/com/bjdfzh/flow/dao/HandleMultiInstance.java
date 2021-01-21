package com.bjdfzh.flow.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.flow.entity.Assignee;

public interface HandleMultiInstance {
 List<Assignee> HandleAssignee(JSONObject Param);
}

