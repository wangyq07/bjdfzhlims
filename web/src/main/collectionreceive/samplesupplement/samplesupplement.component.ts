import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMessageService } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { BusinessProject } from 'src/main/businessprocess/evirmentheath/businessproject/businessproject.service';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service'; 
import { Contact, ContactService } from 'src/services/ContactService';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page';

@Component({
  selector: 'app-samplesupplement',
  templateUrl: './samplesupplement.component.html',
  styleUrls: ['./samplesupplement.component.scss']
})
export class SamplesupplementComponent extends PageBase implements OnInit { 
  constructor(
     public indexService:IndexService
    ,private flowservice:FlowService 
    ,private contactservice:ContactService
    ,private actroute:ActivatedRoute 
    ,private router: Router
    ,private globalaudit:AuditResultService
    ,private msg:XMessageService
    
    ) {
    super(indexService);
    if(actroute !=undefined)
      {
         
        actroute.params.subscribe(
        (x:any)=>
          {
            
            this.contactid=x.contactid;
            this.getData();
          }
        );
      }
  }
  projects:BusinessProject[]=[];
  currentcontact:Contact={};
  getData()
  {
    this.contactservice.getcontactproject(this.contactid+'').subscribe(
      (x)=>
      { 
        console.log(x); 
        this.currentcontact=x.contact as Contact;
       this.projects=x.projects as any[];
      }
    );
  }
   contactid="";
  ngOnInit(): void {
  }

}
