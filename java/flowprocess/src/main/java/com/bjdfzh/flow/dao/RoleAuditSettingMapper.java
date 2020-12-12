package com.bjdfzh.flow.dao;

import java.util.List;

import com.bjdfzh.flow.entity.RoleAuditSetting;
 

public interface RoleAuditSettingMapper {
List<RoleAuditSetting>	getroleauditsetting();
RoleAuditSetting getroleauditsettingbyid(String roleid);
void updateroleauditsetting(RoleAuditSetting roleauditset);
void addroleauditsetting(RoleAuditSetting roleauditset);
void deleteroleauditsetting(String roleid);
}
