package com.bjdfzh.businessprocess.util;

import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.TestMethod;
import com.bjdfzh.businessprocess.entity.TestProject;
import com.bjdfzh.businessprocess.entity.TestStandard;

public class Qualificationtemp
{
	 Qualification qlf;
	 TestStandard tstand;
		TestMethod tm ;
		public Qualification getQlf() {
			return qlf;
		}
		public void setQlf(Qualification qlf) {
			this.qlf = qlf;
		}
		public TestStandard getTstand() {
			return tstand;
		}
		public void setTstand(TestStandard tstand) {
			this.tstand = tstand;
		}
		public TestMethod getTm() {
			return tm;
		}
		public void setTm(TestMethod tm) {
			this.tm = tm;
		}
		public TestProject getTp() {
			return tp;
		}
		public void setTp(TestProject tp) {
			this.tp = tp;
		}
		TestProject tp ;
}