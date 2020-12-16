package com.bjdfzh.flow.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.flow.entity.RoleAuditSetting;
 
@Transactional
public interface RoleAuditSettingMapper {
List<RoleAuditSetting>	getroleauditsetting();
RoleAuditSetting getroleauditsettingbyid(String roleid);
void updateroleauditsetting(RoleAuditSetting roleauditset);
void addroleauditsetting(RoleAuditSetting roleauditset);
void deleteroleauditsetting(String roleid);
}
