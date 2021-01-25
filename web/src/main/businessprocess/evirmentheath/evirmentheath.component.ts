import { Component, OnInit,AfterContentInit,ViewChild, ViewEncapsulation, DoCheck, ChangeDetectorRef } from '@angular/core';
import {  XRadioNode, XData} from '@ng-nest/ui';
 
import { CommonService } from 'src/services/CommonRespositoryService'; 
 
import { Customer} from 'src/services/CustomerService';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
 
 
import { ContactComponent } from './contact/contact.component';
import { Contact, ContactService } from 'src/services/ContactService';
import { BusinessprojectComponent } from './businessproject/businessproject.component';
import { ActivatedRoute } from '@angular/router';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
 
import { CustomerComponent } from './customer/customer.component';
import { BusinessProject } from './businessproject/businessproject.service';
import { round } from 'lodash';
 
 
 
@Component({
  selector: 'app-evirmentheath',
  templateUrl: './evirmentheath.component.html',
  providers: [CommonService],
  encapsulation: ViewEncapsulation.None
})
export class EvirmentheathComponent extends PageBase implements OnInit,AfterContentInit,DoCheck { 
  
  collectionform:XData<XRadioNode>=[{id:1,label:"采样"},{id:2,label:"送样"},{id:3,label:"邮寄"}];
  collectionmodel=1;
  weituomodel = 1;
   standprice=2300.45;
   discountprice=1800.97;  
   @ViewChild("contactlist")contactlist:ContactComponent;
   @ViewChild("businessprojectlist")businessprojectlist:BusinessprojectComponent;
   @ViewChild("customerlist")customerlist:CustomerComponent;
   changeCustomer(customer:Customer)
   { 

     if(this.taskcustomerid !=null&&this.taskcustomerid !=-1)
     {
       this.customerlist.setActive(this.taskcustomerid);
     }
     this.contactlist.activeid="";
      if(this.taskcustomerid !=-1)
      { 
        this.contactlist.activeid=this.taskcontactid;
      }
       
      this.contactlist.customer=this.customerlist.currentCustomer; 
      this.contactlist.getcontactdata(true);
      
   }
   contactChange(contact:Contact)
   {
     
    
     if(this.contactlist.contactdata.length==0)
     {
        
      this.businessprojectlist.currentcontact={};
      this.businessprojectlist.currentproject={};
      
     }
      else
      {
         var findex=contact.contactcustomers?.findIndex((x)=>x.customertype !=undefined&&x.customertype==1);
        
            console.log(contact);
              if(findex==-1||findex==undefined)
              { 
                contact.contactcustomers=[
                  {contactid:contact.id+'',customername:this.contactlist.customer.customername,
                    customerid:this.contactlist.customer.id,customertype:1},
                    {contactid:contact.id+'',customername:this.contactlist.customer.customername,
                      customerid:this.contactlist.customer.id,customertype:2},
                      {contactid:contact.id+'',customername:this.contactlist.customer.customername,
                        customerid:this.contactlist.customer.id,customertype:3} 
                  ]; 
                  contact.isjudgement=0;
                  contact.judgement='';
                  contact.judgementstandard='';  
                  contact.service={id:1};
                  contact.samplesource={id:1};
                  contact.seal=[{id:1}];
                  contact.collectionfee=0;
                  contact.externfee=0; 
                  contact.businessfee=0; 
            }
          this.businessprojectlist.currentcontact=contact;  
      }
     this.businessprojectlist.getdata();
     if(this.taskprojectid !=undefined&&this.taskprojectid!='')
     {
       this.businessprojectlist.activeprojectid= this.taskprojectid;
     }
   }
   styleset="display:none";
  setdis()
  {
    this.styleset="display:inline"; 
  } 
  ProjectsChange(projects:BusinessProject[])
  {
    this.contactlist.currentContact.testfee=0;
    this.contactlist.currentContact.standardfee=0;
     var reportfee=0;
    projects.map(
      (x)=>
      {
        reportfee =reportfee+(Number(x.reportcount)>2? (Number(x.reportcount)-2)*50:0);
        x.samples?.map(
          (y)=>
          {
            this.contactlist.currentContact.testfee =Number(  this.contactlist.currentContact.testfee)+Number(y.price);
            this.contactlist.currentContact.standardfee =Number(  this.contactlist.currentContact.standardfee)+Number(y.standardfee);
            
          }
        );
      }
      );
      if(this.contactlist.currentContact.service?.id==2)
      {
      this.contactlist.currentContact.standardfee=Number(this.contactlist.currentContact.standardfee)*2;
      this.contactlist.currentContact.testfee=Number(this.contactlist.currentContact.testfee)*2;
      }
      if(this.contactlist.currentContact.service?.id==3)
      {
      this.contactlist.currentContact.standardfee=Number(  this.contactlist.currentContact.standardfee)*1.5; 
      this.contactlist.currentContact.testfee=Number(this.contactlist.currentContact.testfee)*1.5;
       }
      if(this.contactlist.currentContact.standardfee !=0)
     this.contactlist.currentContact.discount=round(Number( this.contactlist.currentContact.testfee)/Number(  this.contactlist.currentContact.standardfee)*100)/100;
     this.contactlist.currentContact.totalfee=round((Number(this.contactlist.currentContact.testfee)
                                              +Number(this.contactlist.currentContact.businessfee)
                                              +Number(this.contactlist.currentContact.collectionfee)
                                              +reportfee
                                              +Number(this.contactlist.currentContact.externfee))*100)/100;
   this.contactlist.currentContact.ugency=this.contactlist.currentContact.service?.label; 
    if(!this.businessprojectlist.contactdisabled)
    {
      console.log(this.contactlist.currentContact);
       this.contactService.updatecontactinfo( this.contactlist.currentContact).subscribe
       ((x)=>console.log(x));
    }
     this.contactlist.refreshdata();
    }
  showTableBoolean=false;
  showTableBooleancon=false;
  showTableBooleanpr=false;
  ngDoCheck(): void { 
  } 
   
  setweituodanname()
  {
     
  }
  
  constructor( 
    public indexService: IndexService,
    private contactService:ContactService, 
    private activatedRoute: ActivatedRoute
    ,private flowservice:FlowService
    ) {
       super(indexService);
       this.activatedRoute.params.subscribe((x:any)=>
       { 
         if(x.projectid !=undefined)
         { 
         this.flowservice.getcontactbyproject(x.contactid).subscribe
         (
           (y)=>
           { 
             this.taskprojectid=y.projectid;
             this.taskcustomerid=y.customerid;
             this.taskcontactid=y.contactid;
              
           }
         )
       }
       else
       {
        this.taskcustomerid=-1;
       }
      }
       );
     } 
     taskprojectid="";
     taskcustomerid=0;
     taskcontactid="";
      
  ngAfterContentInit(): void { 
   
  }
 
  ngOnInit(): void { 
    setTimeout(()=>{this.showTableBoolean=true},0); 
    setTimeout(()=>{this.showTableBooleancon=true},0); 
    setTimeout(()=>{this.showTableBooleanpr=true},0); 
 
  }
   
}
