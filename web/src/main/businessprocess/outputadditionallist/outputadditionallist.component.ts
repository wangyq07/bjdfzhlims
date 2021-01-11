import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdditionalData, ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-outputadditionallist',
  templateUrl: './outputadditionallist.component.html',
  styleUrls: ['./outputadditionallist.component.scss']
})
export class OutputadditionallistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  data:AdditionalData[]=[];
  pagedatas:any[]=[];
  
  setdata(projects:any[],judgement:string,pagsize:number)
  {
     this.data=ProjectUtil.getMareData(projects,judgement);
     var q=0;
     this.pagedatas=[];
    
       for(var i=0;i<this.data.length;i++)
       {
          if(i%pagsize==0)//十条数据为一页
          {
            this.pagedatas.push({pagenumber:ProjectUtil.NumberToChinese(q+1),data:[]});
            q=q+1;
          }
          this.pagedatas[this.pagedatas.length-1].data.push(this.data[i]);
       }
       //console.log(this.pagedatas);
        /**/for(var i=0;i<this.pagedatas.length;i++)
        {
          var pindex=0;var srowindex=0;
          for(var j=0;j<this.pagedatas[i].data.length;)
          {
            var tempdata=this.pagedatas[i].data.filter((x:any)=>x.projectid==this.pagedatas[i].data[j].projectid);
            var prowspan=tempdata.length;
            for(var p=j;p<j+prowspan;)
            { 
               
              var ttempdata=tempdata.filter((x:any)=>x.sampleid==this.pagedatas[i].data[p].sampleid);
               var srowspan=ttempdata.length; 
               for(var q=p;q<p+srowspan;q++)
               {
                this.pagedatas[i].data[q].projectrowspan=prowspan;
                this.pagedatas[i].data[q].projectindex=pindex;
                this.pagedatas[i].data[q].samplerowspan=srowspan;
                this.pagedatas[i].data[q].sampleindex=srowindex;
               }
               srowindex=srowindex+srowspan;
               p=p+srowspan;
            }
            j=j+prowspan;
            pindex=pindex+prowspan;
          }
        }
        //console.log(this.pagedatas);
  }
  
  
}


