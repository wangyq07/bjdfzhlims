import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-registerfoodsample',
  templateUrl: './registerfoodsample.component.html',
  styleUrls: ['./registerfoodsample.component.scss']
})
export class RegisterfoodsampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  sampledatas:any[]=[];
  setsampledata(sampledata:any[],pagesize:number)
  {
    var q=0;
    this.sampledatas=[];
   
      for(var i=0;i< sampledata.length;i++)
      {
         if(i%pagesize==0)//十条数据为一页
         {
           this.sampledatas.push({pagenumber:ProjectUtil.NumberToChinese(q+1),data:[]});
           q=q+1;
         }
         sampledata[i].expireddate=moment(sampledata[i].expireddate).format("YYYY-MM-DD");
         this.sampledatas[this.sampledatas.length-1].data.push(sampledata[i]);
      }
      if(this.sampledatas.length>0&&this.sampledatas[this.sampledatas.length-1].data.length<10)
      {
        for(var i=this.sampledatas.length;i<pagesize;i++)
        {
          this.sampledatas[this.sampledatas.length-1].data.push({});
        }
      }
  }
}
