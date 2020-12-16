package com.bjdfzh.businessprocess.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.bjdfzh.businessprocess.entity.Sample;
@Transactional
public interface SampleMapper {
List<Sample>	getsamples(String contactid);
Sample getsample(String id);
void addsample(Sample sample);
void addsamples(List<Sample> samples);
void updatesample(Sample sample);
void deletesamplebycontact(String id);
void deletesample(String id);
void supplimentupdatesamples(List<Sample> samples);
}

