import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { Contact, ContactService } from 'src/services/ContactService';
import { Customer } from 'src/services/CustomerService';
import { ProjectUtil } from 'src/share/utilclass';
import * as moment from   'moment'
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
import { RoleDiscountService } from 'src/main/system/rolediscount/rolediscount.service';
import { BusinessProject, ContactProjectService } from '../businessproject/businessproject.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends PageBase implements OnInit { 
  constructor(public indexService: IndexService 
              ,private contactservice:ContactService
              ,private msgBox: XMessageBoxService
               ,private msg:XMessageService
               ,private flowservice:FlowService
               ,private projectservice:ContactProjectService
               ,private rolediscountservice:RoleDiscountService
              ) {super(indexService); }
  @Output() private contactChange=new EventEmitter<Contact>();
  customer:Customer;
  contactdata:Contact[]=[];
  allcontactdata:Contact[]=[];  
  contactcolumns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80,  type: 'index' },
    { id: 'actions', label: '操作', width: 180},
    { id: 'id', label: '合同编号', width: 80, sort: true },
    { id: 'totalfee', label: '总费用', width: 80, sort: true } ,
    { id: 'testfee', label: '检测费', width: 80, sort: true },
    { id: 'standardfee', label: '标准检测费', width: 100, sort: true }, 
    {id:'discount',label:'折扣',width:80},
    { id: 'ugency', label: '加急类型', width: 80, sort: true },
    { id: 'signdate', label: '签订日期', width: 100, sort: true }
  ]; 
  ngOnInit(): void {
  }
  activeid="";
  setActive(contactid:string)
  {
     this.activeid=contactid;
  }
  @ViewChild('contacttable')contacttable:XTableComponent;
  cotactaction(type:string,item?:any)
  { 
       switch(type)
       {
         case "add":
      if(this.customer ==undefined||this.customer.id==undefined||this.customer.id=='')
          {
            this.msgBox.alert("还没有选择客户");
          }
          else
          {
              var d=moment().format('YYYY-MM-DD');
              this.currentContact={id:ProjectUtil.GetRandomStr(true,5,16),
              customerid:this.customer.id, signdate:d
            };
            console.log(d);
           
            this.currentContact.userid=this.indexService.auth.user.id+'';
            this.contactservice.post(this.currentContact).subscribe
            (
              (x)=>
              {
                this.currentContact=x;
                this.contactdata.push(x);
                this.contactdata=this.contactdata.map((x)=>{return x;});
                this.contacttotal=this.contactdata.length;
                this.contacttable.activatedRow=x;
                if(this.contactchange !=undefined)
                this.contactChange.emit(x);
            }
            ); 
          }
     break;

     case "delete":
      this.msgBox.confirm({
        title: '提示',
        content: `此操作将永久删除此条数据：${item.id}，是否继续？`,
        type: 'warning',
        callback: (action: XMessageBoxAction) => {
          action === 'confirm' &&
            this.contactservice.delete(item.id||'').subscribe((x) => {
              var delindex=ProjectUtil.setafterdelete(item.id,this.contactdata);
              this.msg.success('删除成功');
              this.contactdata=   this.contactdata.map((y)=>{return y;});
              this.contacttotal=this.contactdata.length;
              if(delindex>0)
              {
                 this.currentContact=this.contactdata[delindex-1]; 
              } 
              else if(delindex==0&&this.contacttotal>0)
              {
                this.currentContact=this.contactdata[delindex+1]; 
              } 
              this.contacttable.activatedRow=this.currentContact; 
              if(this.contactchange !=undefined)
              this.contactChange.emit(this.currentContact);
            });
        }
      });
      break;
      
        case 'submit':
     var delegatecustomer=  item.contactcustomers.find((x:any)=>x.customertype==1) ;
     if(delegatecustomer !=undefined&&delegatecustomer.area !=undefined)
     {
       this.rolediscountservice.getrolediscountvaluebyid(delegatecustomer.area
                                   ,this.indexService.auth.user.roles)
                                .subscribe(
                                  (x)=>
                                  { 
                                    this.flowservice.startflow(
                                      { 
                                        customername:delegatecustomer.customername
                                       ,userid:this.indexService.auth.user.id+''
                                       ,username:this.indexService.auth.user.name
                                       ,contactid:item.id
                                       ,instanceKey:'LimsTestProcess'
                                       }
                                    ).subscribe(
                                      (y)=>
                                      {
                                        this.projectservice.getprojects(item.id).subscribe(
                                          (q)=>{
                                        this.flowservice.excutetask(
                                         y.TaskId,
                                         {
                                          userid:this.indexService.auth.user.id+''
                                          ,username:this.indexService.auth.user.name 
                                          ,contactid:item.id 
                                          ,limitdiscount:x.discount
                                          ,ugencytype:item.service.id
                                         }
                                        ).subscribe
                                        (
                                          (z)=>
                                          {
                                             this.msg.success("提交成功");
                                             this.currentContact.contactstatus=1;
                                          }
                                        )
                                      }
                                    );
                                      }
                                      
                                    )
                                  }
                                    
                                );
     }
        
      break;
        break;
    }
  } 
  currentContact:Contact;
  contactindex=1;
  contactsize=20; 
  contacttotal=0;
  contactquery:XQuery={filter:[]};
  getcontactdata(init:boolean=true)
  {
     
    this.contactquery={filter:[{field:'id',value:""+this.customer.id,operation:"="}
                                ,{field:'userid',value:""+this.indexService.auth.user.id,operation:"="}]}; 
     this.contactservice.getList(this.contactindex,this.contactsize,this.contactquery).subscribe
     (
       (x)=>
       { 
         [this.contactdata,this.contacttotal]=[x.list as Contact[],Number(x.total)];  
         console.log(x.list);
         if(this.contactdata.length>0)
          {
               if(init)
               {
                 if(this.activeid !="")
                 {
                  var findex=this.contactdata.findIndex((x)=>x.id==this.activeid);
                  if(findex !=-1)
                  {
                    this.currentContact=this.contactdata[findex]; 
                  }
                  else
                  {
                    this.currentContact=this.contactdata[0]; 
                  }
                 }
                 else
               this.currentContact=this.contactdata[0]; 
              }
              this.contacttable.activatedRow=this.currentContact; 
             
          } 
          this.contactChange.emit(this.currentContact);
       }

     )
  }
  refreshdata()
  {
    this.contactdata=[...this.contactdata];
  }
  contactchange(selectedrow:XTableRow)
  {
    this.currentContact=selectedrow as Contact; 
    this.contactChange.emit(selectedrow as Contact);
  }
  @Input() auth: { [code: string]: boolean } = {};
  copaycotactaction()
  {
     if(this.currentContact!=null
      &&this.currentContact!=undefined
      &&this.currentContact.id!=undefined
      )
      {
         
        this.contactservice.getcontactproject(this.currentContact.id+'').subscribe
        (
         (x)=> {
                 var cntact=x.contact as Contact;
                 cntact.id=ProjectUtil.GetRandomStr(true,6,10);
                 cntact.contactcustomers?.map(
                   (d)=>
                   {
                     d.contactid=cntact.id+'';
                   }
                   );
                 var projects=x.projects as BusinessProject[];
                 var i=1;
                 projects.map(
                   (y)=>
                   {
                     y.contactid=cntact.id+'';
                     y.id=ProjectUtil.JsNewGuid();
                     y.projectnumber="临时项目"+i;
                     i=i+1;
                     y.projectstatus=0;
                     y.samples?.map(
                       (z)=>
                       {
                         z.projectid=y.id+'';
                        z.id=ProjectUtil.JsNewGuid();
                        z.testprojects?.map(
                          (q)=>
                          {
                            q.sampleid=z.id+'';
                          }
                          );
                       }
                     );
                   }
                   );
                   this.contactservice.addcontactproject({contact:cntact,projects:projects})
                   .subscribe(
                     ()=>
                     {
                        this.currentContact=cntact;
                        this.contactdata.push(cntact);
                        this.contactdata=[...this.contactdata];
                        if(this.contactChange !=null)
                          this.contactChange.emit(cntact);
                    }
                   );
             }
        );
      }
  }
  contactIndexChange(index: number)
  {
     this.contactindex=index;
  }  
  submitdisable(row:Contact)
   { 
      if(row.contactstatus==1)
        return true;
        return false;
   }
}
