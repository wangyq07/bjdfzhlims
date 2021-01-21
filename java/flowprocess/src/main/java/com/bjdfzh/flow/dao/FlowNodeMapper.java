package com.bjdfzh.flow.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.flow.entity.FlowSpecialDispatch;
import com.bjdfzh.flow.entity.TaskNode;
import com.bjdfzh.flow.entity.TaskNodeRole;
@Transactional
public interface FlowNodeMapper { 
TaskNode getFlowNodeById(String id,String flowid);
List<TaskNode> getFlowNodes(String flowid); 
void addflownode(TaskNode node);
void addflownodebymaxnode(String maxflowid,String currentflowid);
void addflowrolebymaxnode(String maxflowid,String currentflowid);
void addflowrolespecialbymaxnode(String maxflowid,String currentflowid);
void addflowrole(List<TaskNodeRole> roles); 
void deleteflownode(String id,String flowid);
void deleteflowrole(String id,String flowid);
void deleteflowrolespecial(String id,String flowid);
void addflowrolespecial(List<FlowSpecialDispatch> flows);
}
