 import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTableColumn, XTableComponent } from '@ng-nest/ui'; 
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { Sample } from 'src/services/sample.service';
import { ProjectUtil } from 'src/share/utilclass';
import { BusinessProject } from '../businessproject/businessproject.service';
import { AddsampleComponent } from './addsample/addsample.component';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent extends PageBase implements OnInit,DoCheck {

  constructor(public indexService: IndexService
    ,private msgBox: XMessageBoxService
    ,private msg:XMessageService 
     ) {super(indexService); }
  ngDoCheck(): void {
   
  }

  ngOnInit(): void {
    this.currentsample=this.getnewsample();
  }
  samplevisible:boolean=false; 
     samplesize=20;
     sampleindex=1;
     samplequery:XQuery={filter:[]}; 
     sampletotal=0;  
     currentsample:Sample;
     samplecolumns:XTableColumn[]=[
      { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
      { id: 'actions', label: '操作', width: 100, left: 100 },
      { id: 'samplename', label: '样品名称', width: 200, sort: true }, 
      { id: 'price', label: '样品价格', width: 200, sort: true } ,
      { id: 'testproject', label: '检测项目', width: 200, sort: true } ,
      { id: 'methodname', label: '检测方法', width: 200, sort: true }  
     ]
   currentproject:BusinessProject;
   sampledata:Sample[];
   @ViewChild("samplecomponent")samplecomponent:AddsampleComponent;  
   @ViewChild("sampletable")sampletable:XTableComponent;
   getnewsample():any
   {
     return  {projectid:this.currentproject!=undefined?this.currentproject.id:undefined,id:ProjectUtil.JsNewGuid(),
      samplename:'',
     samplequality:1+'',
     price:0.0,
     externprice:0.0,
     testprojects:[]
     }; 
   }
   domaindisabled=false;
   setcopy(item?:any)
   {
      
   var coloneobj=  ProjectUtil.deepClone(item);
   coloneobj.id=ProjectUtil.JsNewGuid();
   coloneobj.samplenumber='';
   coloneobj.sampledate=undefined;
   this.sampledata.push(coloneobj);
   
   this.sampledata=[...this.sampledata];
   }
  sampleaction(type:string,item?:any)
  {  
    if(type=='copyadd' )
    {
      console.log(this.currentsample);
      if(this.sampletable.activatedRow !=undefined)
      this.setcopy(this.sampletable.activatedRow);
      else
      {
        this.msgBox.alert("没有复制对象");
      }
      return;
    }
    this.samplecomponent.type=type;
    if(type !="delete")
    {  
      var index=-1;
      if(item==undefined)
      { 
        this.currentsample=this.getnewsample(); 
         this.samplecomponent.currentsample=this.currentsample;
      }
       else
      { 
         this.currentsample=item;
         index=this.sampledata.findIndex((x)=>x.id==item.id);
         this.samplecomponent.currentsample=item; 
      }
       
      if(this.currentproject.mergereport==0&&this.sampledata.length>0&&index!=0)
      {
        this.domaindisabled=true;
        this.currentsample.domainid=this.sampledata[0].domainid;
      }
      else
      {
        
        this.domaindisabled=false;
       
      }
      this.samplecomponent.getproject();
      this.samplevisible=true;
   }
    else
      {
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${item?.samplename}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            if(action === 'confirm'&&item !=undefined)
                {
               var delindex=ProjectUtil.setafterdelete(item.id+'',this.sampledata);
               this.sampledata=[...this.sampledata];  
                this.sampletotal=this.sampledata.length;
                if(delindex>0)
                {
                   this.currentsample=this.sampledata[delindex-1];
                   this.sampletable.activatedRow=this.currentsample; 
                }  
          }
        }
        });
      }  
  }
  type:string;
  get disabled()
  {  
    return this.type=="info";
  }
  activechange(item:any)
  {
      this.currentsample=item;
      //console.log(item);
  }
  setsampledata(data:Sample[])
  {
    this.sampledata=[];
    this.sampledata=data;
    this.currentsample={};
    this.sampletable.activatedRow=undefined;
    if(this.sampledata.length>0)
    {
      this.currentsample=this.sampledata[0];
      this.sampletable.activatedRow=this.currentsample;
    } 
  } 
  handlesamplechange(obj:string)
     {
    if(this.samplecomponent.currentsample !=null)
       this.currentsample=this.samplecomponent.currentsample;
      switch(obj)
      {
        case 'add':
            this.sampledata.push(this.currentsample); 
            this.sampledata=[...this.sampledata];  
         break;
        
         case 'edit': 
           var currentdomainid=this.sampledata[0].domainid;
           this.sampledata=this.sampledata.map
           (
            (x)=>
             {
               if(this.currentproject.mergereport==0)
               {
                 x.domainid=currentdomainid;
               }
               if(x.id==this.currentsample.id)
                 return this.currentsample; 
                return x;
             }
           ); 
        break; 
        default: 
          break;
      } 
      this.samplevisible=false; 
     }
    
}
