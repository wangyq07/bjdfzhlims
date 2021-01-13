import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XQuery, XSort } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
 
import { IndexService } from 'src/layout/index/index.service';
import { FlowService, Task } from 'src/main/flow/flowprocess/flowhandle.service';
import { AuditResultService } from 'src/services/transform.data.service';
import { PageBase } from 'src/share/base/base-page'; 
 
@Component({
  selector: 'app-waittask',
  templateUrl: './waittask.component.html',
  styleUrls: ['./waittask.component.scss'],
  
  encapsulation: ViewEncapsulation.None
})
export class WaittaskComponent  extends PageBase implements OnInit,AfterViewInit {
  index=1;
  size=10000;
  total=0;
  query: XQuery = {};
  data:Task[];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80, type: 'index' },
    { id: 'actions', label: '操作', width: 100 } ,
    { id: 'name', label: '任务', width: 100, sort: true }, 
    { id: 'customername', label: '客户', width: 150, sort: true },
    {id:'preuser',label:'前置处理人', width: 200, sort: true},
    {id:'createtime',label:'创建日期', width: 200, sort: true},
    { id: 'from', label: '上一节点', width: 100, sort: true }
  ];
  constructor(public indexService: IndexService, 
    private flowservice:FlowService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ,private globalaudit:AuditResultService
    ) { super(indexService); 
     
      activatedRoute.params.subscribe(
        (x)=>
        {
          if(x.refreshdata)
          {
            this.getData();
          }
        }
      );
    }
    HandleAuditResult(  msg:string)
    {
       console.log(msg);
       this.getData();
    }
  ngAfterViewInit(): void {
    
    if(this.indexService.auth.user.roles!=undefined)
    this.getData(); 
    this.globalaudit.auditResultMessage.subscribe(
      (msg:string)=>{  console.log(msg);
        this.getData();}
    );
  }
  @ViewChild('tableCom') tableCom: XTableComponent;
  ngOnInit(): void {
     //this.index=1;
    
  }
  action(info:string,row:Task)
  { 
       let params={contactid:row.contactid,taskid:row.taskid};
       this.router.navigate([`${row.router}`,params]);
  }
browsediagram(row:Task)
{
  this.query={filter:[{field:"instanceid",value:row.instanceid+'',operation:"="}]};
  this.flowservice.getDiagram(this.query
 ).subscribe((x:any)=>{
   var mysvg = document.getElementById("svg_my");
   if(mysvg)
     mysvg.innerHTML=x.output;
 }
 );
}
activatedRow(row:Task)
{
  this.browsediagram(row);
}
getData() {
  if(this.indexService.auth.user.roles!=undefined )
  {
   
  this.flowservice.getTaskListByRoleId(this.indexService.auth.user.roles).subscribe((x)=>
  {
    console.log(x);
    if(x.list !=undefined)
    [this.data, this.total] = [x.list as Task[], x.list.length];
    this.data=[...this.data];
  }
  );
}
}

indexChange(index: number) {
  this.index = index;
 
  this.getData();
}

sortChange(sort: XSort[]) {
  this.query.sort = sort;
  
  this.getData();
}
}
