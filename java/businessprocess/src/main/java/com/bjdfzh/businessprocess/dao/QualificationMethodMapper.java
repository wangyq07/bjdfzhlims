package com.bjdfzh.businessprocess.dao;

import java.util.List; 
 
import com.bjdfzh.businessprocess.entity.QualificationMethod;

public interface QualificationMethodMapper {
List<QualificationMethod>	getqualificationmethods(int projectid);
QualificationMethod getqualificationmethodbyid(String id);
List<QualificationMethod> getqualificationmethodbytest(int testprojectid,int standardid);
List<QualificationMethod> getqualificationsbyids(String ids);
List<QualificationMethod> getqualificationmethodsearch(String projectname,String methodname);
void addqualificationmethod(List<QualificationMethod> qualis);
void	updatequalificationmethod(QualificationMethod qual);
void deletequalificationmethod(int id);
void deletequalificationmethods(String ids);
}
