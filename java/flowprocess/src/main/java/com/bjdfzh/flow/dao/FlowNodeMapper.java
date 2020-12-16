package com.bjdfzh.flow.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.flow.entity.TaskNode;
import com.bjdfzh.flow.entity.TaskNodeRole;
@Transactional
public interface FlowNodeMapper { 
TaskNode getFlowNodeById(String id,String flowid);
List<TaskNode> getFlowNodes(String flowid); 
void addflownode(TaskNode node);
void addflowrole(List<TaskNodeRole> roles); 
void deleteflownode(String id,String flowid);
void deleteflowrole(String id,String flowid);
}
