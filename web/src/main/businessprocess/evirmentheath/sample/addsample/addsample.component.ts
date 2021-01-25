import {  Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import {   XInputComponent , XMessageService, XQuery, XTableColumn, XTableRow  } from '@ng-nest/ui'; 
  
import { Contact, ContactTestProject } from 'src/services/ContactService';
import {  Sample, SampleService } from 'src/services/sample.service';
 
import {  QualificationService, SampleDomainService, TestProjectService } from 'src/main/qualification/qualification.service';
 
import { ProjectUtil } from 'src/share/utilclass';
import { CommonType, SealService } from '../../businessproject/businessproject.service';
import { QualificationComponent } from 'src/main/qualification/qualification.component';
import { AddexterntestprojectComponent } from './addexterntestproject/addexterntestproject.component';

@Component({
  selector: 'app-addsample',
  templateUrl: './addsample.component.html',
  styleUrls: ['./addsample.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom 
  
})
export class AddsampleComponent implements OnInit {
  @Input() currentsample:Sample; 
 id: string | null;
  type: string | null;  
  currentcontact:Contact={};
@Output() private sendaddsample=new EventEmitter<string>(); 
@ViewChild('inputsamplename')inputsamplename:XInputComponent;
@ViewChild('inputsamplequality')inputsamplequality:XInputComponent;
@ViewChild('inputsampleprice')inputsampleprice:XInputComponent;
@ViewChild('inputexternice')inputexternice:XInputComponent;
@ViewChild("selqual")qualificationcomponent:QualificationComponent; 
quaconfirm()
{ 
    var tempdata:any[]=[];
    for(var i=0;i<this.qualificationcomponent.selquali.length;i++)
    {
      tempdata.push({
                            id:ProjectUtil.JsNewGuid() 
                            ,sampleid:this.currentsample?.id+''
                            ,qualificationid:this.qualificationcomponent.selquali[i].id+''
                            ,testproject:this.qualificationcomponent.selquali[i].testproject
                            ,methodname:this.qualificationcomponent.selquali[i].methodname
                            ,price:this.qualificationcomponent.selquali[i].price
                            ,realprice:this.qualificationcomponent.selquali[i].price
                            ,testcount:this.qualificationcomponent.selquali[i].testcount
                            ,isextern:0
                            
                             });
                             
    }  
    this.setformmal(true,tempdata);
} 
qualitreeheight="300px";
producthidden="inline";
invalidstring="";
get formInvalid()
{ 
  
   if(this.methodInvalid)
   return true;
  if(this.projectdata.length==0)
  {
    this.invalidstring="样品检测项目为空!";
    return true;
  }
 
return false;
}
  get methodInvalid() { 
    
     var reg=/^[0-9]{1,10}$/; 
    
     this.invalidstring="";
    if(this.inputsamplename !=undefined&&(this.inputsamplename.value==undefined||this.inputsamplename.value==''))
    {
      this.invalidstring="样品名称为空!";
       return true;
    }
     
      if(this.inputsamplequality !=undefined&&(this.inputsamplequality.value==undefined||this.inputsamplequality.value==''))
       {
        this.invalidstring="样品数量为空!";
       return true; 
      }
      
      if(this.inputsamplequality !=undefined&&(this.inputsamplequality.value !=undefined && !reg.test(this.inputsamplequality.value)))
      {
        this.invalidstring="样品数量只能是数字!";
      return true; 
     } 
     if(this.inputsampleprice !=undefined&&(this.inputsampleprice.value==undefined||this.inputsampleprice.value==''))
       {
        this.invalidstring="样品价格为空!";
       return true; 
      }
      
      if(this.inputsampleprice !=undefined&&(this.inputsampleprice.value !=undefined && isNaN(this.inputsampleprice.value)))
      {
        this.invalidstring="样品价格只能是数字!";
      return true; 
     } 
     if(this.inputexternice !=undefined&&(this.inputexternice.value !=undefined && isNaN(this.inputexternice.value)))
      {
        this.invalidstring="样品价格只能是数字!";
      return true; 
     } 
    
    return false; 
  }
  @Input() domaindisabled:boolean;
   
  domaindata:CommonType[];
   
  projectdata:ContactTestProject[]=[];
  projecttotal=0;
  projectsize=20;
  projectindex=1;
  projectquery:XQuery={filter:[]};
  projectcolumns:XTableColumn[]=[ 
    {id:'actions',label:'操作',width:80},
    { id: 'testproject', label: '项目', width: 200, sort: true },
    { id: 'standardname', label: '检测标准', width: 200, sort: true }, 
    { id: 'price', label: '标准价格', width: 200, sort: true },
    { id: 'realprice', label: '实际价格', width: 200, sort: true } 
  ];
  externprojectcolumns:XTableColumn[]=[ 
    {id:'actions',label:'操作',width:80},
    {id:'companyname',label:'供应商',width:80},
    { id: 'testproject', label: '检测项目', width: 200, sort: true } 
  ];
  process:CommonType[]=[];
  processid=1;
  getproject()
   {
     
      this.projectdata=[];
      this.externprojectdata=[];  
      if(this.currentsample.process!=undefined)
      this.processid=Number(this.currentsample.process?.id);
      else
      this.processid=2;
      console.log(this.currentsample.testprojects);
     this.currentsample.testprojects?.map
       ( (x)=>
       { 
            if(x.isextern==0)
            {
               this.projectdata.push(x);
            }
            else if(x.isextern==1)
            {
              this.externprojectdata.push(x);
            } 
       }
      ); 
      this.projecttotal=Number(this.projectdata.length); 
      this.externtotal=Number(this.externprojectdata.length);  
      this.projectdata=[...this.projectdata];
      this.externprojectdata=[...this.externprojectdata];
   }
  get disabled() {
    return  this.type === 'info';
  }
  externprojectdata:any[]=[];
  qexternvisible=false;
  externtotal=0;
  externprojecttotal=0;
  externprojectsize=20;
  externprojectindex=1;
  externprojectquery:XQuery={filter:[]};
  exterquaconfirm()
  {
   var sel= this.externselqual.sealdata.find((x)=>x.id==this.externselqual.seal);
   if(sel !=null)
   {
     console.log(sel.code);
   this.qService.addexterqualification(this.externselqual.provider
                                       ,this.externselqual.testproject
                                       ,sel.code
                                       ).subscribe
    (
      (x)=>
      {
       if(this.externtype=="add")
       {
       var ffindex= this.externprojectdata.findIndex((y)=>y.qualificationid==x.qualification.id);
       if(ffindex==-1)
       {
        this.externprojectdata.push({
          id:ProjectUtil.JsNewGuid() 
          ,sampleid:this.currentsample?.id+''
          ,qualificationid:x.qualification.id
          ,testproject:x.qualification.testproject
          ,companyname:x.qualification.companyname
          ,companyid:x.qualification.companyid
          ,testprojectid:x.qualification.testprojectid
          ,isextern:1 
           });
         
       }
      }
      else
      {
        var ffindex=this.externprojectdata.findIndex((y)=>y.id==this.externitem.id);
        if(ffindex !=-1)
        {
          this.externprojectdata.splice(ffindex,1);
          this.externprojectdata.splice(
            ffindex,0,{
              id:ProjectUtil.JsNewGuid() 
              ,sampleid:this.currentsample?.id+''
              ,qualificationid:x.qualification.id
              ,testproject:x.qualification.testproject
              ,companyname:x.qualification.companyname
              ,companyid:x.qualification.companyid
              ,testprojectid:x.qualification.testprojectid
              ,isextern:1 
               }
          );
        }
      }
      this.externtotal=this.externprojectdata.length;
      this.externprojectdata=[...this.externprojectdata];
    }
   
    );
  }
    /*this.externprojectdata=[];   
    for(var i=0;i<this.externselqual.selquali.length;i++)
    {
     this.externprojectdata.push({
                            id:ProjectUtil.JsNewGuid() 
                            ,sampleid:this.currentsample?.id+''
                            ,qualificationid:this.externselqual.selquali[i].id+''
                            ,testproject:this.externselqual.selquali[i].testproject
                            ,isextern:1 
                             });
                             
    }
    this.externtotal=this.externprojectdata.length;*/

  } 
  provider="";
  seal=1;
  testproject="";
  @ViewChild("externselqual")externselqual:AddexterntestprojectComponent;
  externtype='info';
  externitem:any;
  externprojectaction(type:string,item?:XTableRow)
  {
    //this.externselqual.getData(true);
    this.externtype=type;
    this.externitem=item;
    switch(type)
    {
      case 'add': 
        
          this.qexternvisible=true;
          this.externselqual.seal=this.externselqual.sealdata[0].id;
          this.provider="";
          this.testproject="";
          
          /*this.externselqual.selquali=[];
          
          this.externprojectdata.forEach(
            (x)=>
            {
              this.externselqual.selquali.push({id:Number(x.qualificationid),testproject:x.testproject,testcount:x.testcount});
            }
          ); 
          this.externselqual.refreshdata();*/
      break;
      case 'edit':
        this.qService.getqualificaitonbycompanyidprojectid(item?.companyid,item?.testprojectid).subscribe(
          (x)=>
          {
           
            this.qexternvisible=true; 
            var sel= this.externselqual.sealdata.find((y)=>y.code==x.qualification.firstid);
              if(sel !=null)
              {
                this.seal=Number(sel.id);
                this.externselqual.seal=Number(sel.id);
              }
          
            this.testproject=x.qualification.testproject;
            this.externselqual.testproject=x.qualification.testproject;
            this.externselqual.provider=x.qualification.companyname;
            this.provider=x.qualification.companyname;
           
          }
        );
        break;
      case 'delete': 
             this.deleteprojectmethod(item?.id+'',this.externprojectdata);  
             this.externprojectdata=[...this.externprojectdata];
        break;
   }
  }
  
  constructor(  
    private service:SampleService, 
    private message: XMessageService, 
    private  qService:QualificationService, 
    private domainservice:SampleDomainService
  ) 
  {}
  ngDoCheck(): void {
    
  }
  qvisible=false;
  samplemethod=[]; 
  projectaction(type:string,item?:XTableRow)
  {
    this.qualificationcomponent.getData(false);
    switch(type)
    {
      case 'add': 
        if(this.type =='add'||this.type=='edit')
          this.qvisible=true;
          this.qualificationcomponent.selquali=[];
          this.projectdata.forEach(
            (x)=>
            {
              this.qualificationcomponent.selquali.push({id:Number(x.qualificationid),testproject:x.testproject,testcount:x.testcount});
            }
          );
          this.qualificationcomponent.refreshdata();
      break;
      case 'delete': 
           this.deleteprojectmethod(item?.id+'',this.projectdata) ;
           this.projectdata=[...this.projectdata];  
        break;
   }
  }
  setformmal(isrefilldata:boolean,tempdata:any[])
  {
    this.service.getsamplestandardprice(tempdata).subscribe(
      (x)=>
      {
      
        this.currentsample.standardfee =  x.price;
         
        x.formulars.map(
          (y:any)=>
          {
            var formularprice=eval(y.formular);
            var limitprice=(y.limitprice==0?formularprice:y.limitprice);
             
            this.currentsample.standardfee =this.currentsample.standardfee
            //通过公式计算出费用
            //,如果大于限价，则使用限价，打包价已经在后台计算完成
                 + (formularprice<=limitprice?formularprice:limitprice);
                 
          }
        ); 
        if(isrefilldata)
        {
          this.projectdata=[];
        tempdata.map(
          (z)=>this.projectdata.push(z)
        );
      }
      }
    ); 
  }
  deleteprojectmethod(id?:string,data?:any[])
  {
      var index= data?.findIndex((x)=>{return x.id===id});  
       if(index !=undefined&&index !=-1&&data !=undefined)
       {
         
         
       data.splice(Number(index),1); 
       this.setformmal(false,data);
       
      }
  }
  setcurrent(type:string,cus:Sample)
  {
   
    this.currentsample=cus;
    this.type=type;  
    this.action(type);
    this.getproject();
}
showTableBoolean=false;
showdivBoolean=false;
  ngOnInit() {
     //console.log(this.currentsample);
     this.domainservice.getList(1,20,{}).subscribe(
      (x)=>
      {
        this.domaindata=x.list as CommonType[];
         this.currentsample.domainid=Number(this.domaindata[0].id);
      }
    );
     setTimeout(()=>{this.showTableBoolean=true},3000);
     setTimeout(()=>{this.showdivBoolean=true},0);
    
  }

  ngAfterViewInit() {
    
  } 
  setsavedata()
  {
    this.currentsample.testproject='';
    this.currentsample.methodname='';
    this.currentsample.testprojects=[];
              var concatprojects=this.projectdata.concat(this.externprojectdata);
               for(var q=0;q<concatprojects.length;q++)
                {
                  this.currentsample.testproject += concatprojects[q].testproject; 
                  this.currentsample.methodname +=concatprojects[q].standardname; 
                  if(q !=concatprojects.length-1)
                  {
                    this.currentsample.testproject += ','; 
                    this.currentsample.methodname +=','; 
                  }
                  this.currentsample.testprojects.push(concatprojects[q]);
                }
                var findindex=this.process.findIndex((x)=>x.id==this.processid);
                if(findindex !=-1)
                 this.currentsample.process=this.process[findindex]; 
              
  }
  action(type: string | null) { 
        if(this.currentsample !=undefined)
         {
          
    switch (type) {
      case 'info': 
        this.getproject();
        break;
      case 'edit':
        this.action('info');
        break;
      case 'save':
        this.setsavedata();
        if (this.type === 'add') {  
             this.sendaddsample.emit("add");  
        } else if (this.type === 'edit') {   
             
              this.sendaddsample.emit("edit"); 
        }

        break;
      
      case 'cancel':
        this.sendaddsample.emit("cancel");
        break;
    }
   
  } 
  this.qvisible=false;
}
 
}
