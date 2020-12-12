package com.bjdfzh.businessprocess.dao;

import java.util.List;

import com.bjdfzh.businessprocess.entity.Sample;

public interface SampleMapper {
List<Sample>	getsamples(String contactid);
Sample getsample(String id);
void addsample(Sample sample);
void addsamples(List<Sample> samples);
void updatesample(Sample sample);
void deletesamplebycontact(String id);
void deletesample(String id);
}

