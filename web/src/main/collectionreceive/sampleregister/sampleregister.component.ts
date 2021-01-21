import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { XTableColumn } from '@ng-nest/ui';
import * as moment from 'moment';
import * as printJS from 'print-js';
import { CommonType, SealService } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { RegisterfoodsampleComponent } from 'src/main/outputtemplete/registersample/registerfoodsample/registerfoodsample.component';
import { SampleService } from 'src/services/sample.service';
import { ProjectUtil } from 'src/share/utilclass';

@Component({
  selector: 'app-sampleregister',
  templateUrl: './sampleregister.component.html',
  styleUrls: ['./sampleregister.component.scss']
})
export class SampleregisterComponent implements OnInit,AfterViewInit {
  process:CommonType[]=[];
  constructor(private sampleService:SampleService
    ,private sealService:SealService
    ) {
      this.sealService.getsampleprocess().subscribe(
        (x)=>this.process=x.list as CommonType[]
      );
   }
   setSampleData()
   {
     
     var start=moment( this.startdate).format("YYYY-MM-DD");
     var end=moment( this.enddate).format("YYYY-MM-DD");
     this.sampleService.getsamplebydate(start,end).subscribe(
       (x)=>
       {
         this.tablealldata=x.list;
         this.sampleService.gethandledata(this.tablealldata,1,20,{filter:[]}).subscribe
         (
           (y)=>
           {
             this.sampledata=y.list as any[];
             this.total=Number(y.total);
             this.sampledata.map(
               (x)=>
               {
                 ProjectUtil.setsamplelabel(x,x.process.id+'',this.process);
               }
             );
           }
         );
       }
     );
   }
  ngAfterViewInit(): void {
    this.setSampleData();
  }

  ngOnInit(): void {
  }
  startdate:Date=new Date( moment( ).startOf("month").format("YYYY-MM-DD"));
  enddate:Date=new Date( moment( ).endOf("month").format("YYYY-MM-DD"));
  sampledata:any[]=[];
  columns: XTableColumn[] = [  
    
    { id: 'sampledatelabel', left:0, label: '样品接收日期', width: 150, sort: true },
    { id: 'samplename', left:150, label: '样品名称', width: 150, sort: true }, 
    { id: 'samplenumber',left:300,  label: '样品编号', width: 150, sort: true }, 
    { id: 'brand', label: '商标', width: 150, sort: true }, 
    { id: 'samplespec', label: '净含量/规格', width: 150, sort: true } ,
    {id:'manufactory',label:'生产单位',width:150},
    {id:'manufactoryaddress',label:'生产单位地址',width:150},
    { id: 'samplequality', label: '样品数量', width: 150, sort: true }, 
    { id: 'manudatelabel', label: '生产日期', width: 150, sort: true } , 
    { id: 'executestandard', label: '执行标准', width: 150, sort: true },
    { id: 'executegrade', label: '样品等级', width: 150, sort: true },  
    { id: 'avilabletimelabel', label: '保质期', width: 150, sort: true }, 
    { id: 'wrapherproperties', label: '样品包装及性状', width: 150, sort: true }, 
    { id: 'statuslabel', label: '样品状态', width: 150, sort: true } ,   
    { id: 'leftsample', label: '留样数量', width: 150, sort: true },   
    { id: 'expireddatelabel', label: '到期日期', width: 150, sort: true } ,   
    { id: 'processlabel', label: '样品处置', width: 150, sort: true }            
  ];
  index=0;
  size=200;
  total=0;
  query={};
   tablealldata:any[]=[];
  search()
  {
    this.setSampleData();
  }
  activechange(item?:any)
  {
 
  }
  IndexChange(item?:any)
  {
    this.sampleService.gethandledata(this.tablealldata,item,20,{filter:[]}).subscribe
    (
      (y)=>
      {
        this.sampledata=y.list as any[];
        this.total=Number(y.total);
      }
    );
  }
  @ViewChild("printtable")printtable:RegisterfoodsampleComponent;
  pagesize=10;
  export()
  {
    if(this.sampledata.length>0)
    {
    this.printtable.setsampledata(this.sampledata,this.pagesize); 
    setTimeout(() => {
      printJS({ printable: 'printtable', type: 'html',maxWidth:'98%',targetStyles:['*'],style:'@media print{@page {size:landscape}}'});
    }, 20);
  }
  }
}
