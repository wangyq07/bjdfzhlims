package com.bjdfzh.flow.entity;

import java.util.List;

import com.alibaba.fastjson.JSONObject;

 
public interface  ActivitiEventHandler {
    JSONObject handle(JSONObject param,TaskNode node);
}  