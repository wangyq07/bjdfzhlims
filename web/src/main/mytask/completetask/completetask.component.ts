import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XQuery, XSort, XTableColumn, XTableComponent } from '@ng-nest/ui';
import { IndexService } from 'src/layout/index/index.service';
import { FlowService, Task } from 'src/main/flow/flowprocess/flowhandle.service';
import { PageBase } from 'src/share/base/base-page';

@Component({
  selector: 'app-completetask',
  templateUrl: './completetask.component.html',
  styleUrls: ['./completetask.component.scss']
})
export class CompletetaskComponent extends PageBase implements OnInit,AfterViewInit {
  index=1;
  size=10000;
  total=0;
  query: XQuery = {};
  data:Task[];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80, type: 'index' }, 
    { id: 'name', label: '任务', width: 100, sort: true }, 
    { id: 'customername', label: '客户', width: 150, sort: true },
    {id:'endTime',label:'完成时间', width: 200, sort: true},
    {id:'createtime',label:'创建日期', width: 200, sort: true},
     
  ];
  constructor(public indexService: IndexService, 
    private flowservice:FlowService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    ) { super(indexService); 
      
    }
   
  ngAfterViewInit(): void {
    console.log(this.indexService.auth.user); 
    if(this.indexService.auth.user.roles!=undefined)
    this.getData(); 
  }
  @ViewChild('tableCom') tableCom: XTableComponent;
  ngOnInit(): void {
     //this.index=1;
    
  }
  action(info:string,row:Task)
  { 
       let params={projectid:row.contactid,taskid:row.taskid};
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
   
  this.flowservice.getTaskListByUserId(this.indexService.auth.user.id+'').subscribe((x)=>
  { 
    [this.data, this.total] = [x.list as Task[], x.list.length];
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
