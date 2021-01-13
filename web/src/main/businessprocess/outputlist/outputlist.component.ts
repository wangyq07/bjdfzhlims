import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 
 

@Component({
  selector: 'app-outputlist',
  templateUrl: './outputlist.component.html',
  styleUrls: ['./outputlist.component.scss']
})
export class OutputlistComponent implements OnInit,AfterViewInit {
  
  constructor() {
    
   }
   @Output() sendcomplete=new EventEmitter();
   delegatename="";
   projects:any[]=[];
   inspectadd="";
inspectuser="";
delegatephone="";
delegatecontacter=""
payuser="";
delegateadd="";
   setprojects(pjs:any[],contact:any) 
   {
    this.delegatename="";
     this.projects=[];
    var users=contact.contactcustomers.filter((x:any)=>x.customertype==1);
    if(users.length>0)
    {
       for(var i=0;i<users.length;i++)
       {
         if(i !=0)
         {
           this.delegatename =this.delegatename+',';
         }
         this.delegatename=this.delegatename+users[i].customername;
       }
       this.delegateadd=users[0].customeraddress;
       this.delegatecontacter=users[0].contacter;
       this.delegatephone=users[0].phone;
    } 
    var user= contact.contactcustomers.find((x:any)=>x.customertype==2);
             this.payuser=user?.customername+'';
                user=contact.contactcustomers.find((x:any)=>x.customertype==3);
              this.inspectuser= user?.customername+'';
              this.inspectadd=user?.customeraddress;
     var i=0;
     var str:string="";
     var q=1;
     this.reportcount=0;
        pjs.map(
          (x)=>
          {
            this.reportcount=this.reportcount+(x.reportcount-2);
            x.samples.map(
              (y:any)=>
              {
               
                  if(i==0)
                  {
                    str="{";
                  } 
                  str =str+'"projectname'+i+'":"'+x.projectnumber+'","samplename'+i+'":"'+y.samplename+'"';
                   if(i==1)
                   {
                     i=0;
                     str = str+"}";  
                     this.projects.push(JSON.parse(str));
                     q=q+1;
                   }
                  else
                  {
                    str=str+',';
                   i=i+1;
                 }
              }
            )
          }
        );
        if(i!=0)
        {
          str = str+'"projectname1":"","samplename1":""}';  
          this.projects.push(JSON.parse(str));
          q=q+1;
        }
        if(q<6)
        {
          for(var p=this.projects.length;p<6;p++)
          {
            this.projects.push({projectname0:'',samplename0:'',projectname1:'',samplename1:''});
          }
        }
        
        this.reportcount= this.reportcount+2;
        this.testfee=contact.testfee;
        this.urgencyfee=contact.urgencyfee;
         contact.seal.map(
           (x:any)=>
           {
              var ffindex= this.seals.findIndex((y)=>y.id==x.id);
              if(ffindex !=-1)
              {
                this.seals[ffindex].checked=true;
              }
           }
         );
          
         if(contact.externfee>0)
         {
          var ffindex=  this.dataexterns.findIndex((x)=>x.id==2);
          if(ffindex !=-1)
          {
            this.dataexterns[ffindex].checked=true;
          }
         }
         else
         {
          var ffindex=  this.dataexterns.findIndex((x)=>x.id==1);
          if(ffindex !=-1)
          {
            this.dataexterns[ffindex].checked=true;
          }
         }
         this.sampleSource.map(
           (x)=>
           {
             if(x.id==contact.samplesource.id)
             {
               x.checked=true;
             }
           }
         );
         this.services.map(
          (x)=>
          {
            if(x.id==contact.service.id)
            {
              x.checked=true;
            }
          }
         );
         this.processes.map(
           (x)=>
           {
            if(x.id==contact.processid)
            {
              x.checked=true;
            }
           }
         );
   }
   dataexterns:any[]=[{id:1,label:"否",checked:false},{id:2,label:"是,具体描述:",checked:false}];
   sampleSource:any[]=[{id:1,label:"客户送样",checked:false},{id:2,label:"实验室采样",checked:false}];
   seals:any[]=[
                   {id:1,label:"CMA",checked:false}
                  ,{id:2,label:"CNAS",checked:false}
                  ,{id:3,label:"CATL",checked:false}
                  ,{id:999,label:"不需加盖资质章",checked:false}
                ];
  processes:any[]=[
    {id:1,label:"领回",checked:false}
   ,{id:2,label:"处理",checked:false}
   ,{id:3,label:"其他:________________________",checked:false} 
 ];
 services:any[]=[
  {id:1,label:"常规服务：样品接受后5至7个工作日，特殊项目除外",checked:false}
 ,{id:2,label:"加急服务：3个工作日加急",checked:false}
 ,{id:3,label:"加急服务：4个工作日加急",checked:false} 
];
reportcount=2;
reportforms:any[]=[
  {id:1,label:"纸质版报告",checked:false}
 ,{id:2,label:"结果或数据",checked:false} 
];
urgencyfee=0;
testfee=0;
  ngAfterViewInit(): void {
     
  }

  ngOnInit(): void {
  } 
}
