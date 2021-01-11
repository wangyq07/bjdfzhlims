import { Component,EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { XMessageBoxService, XMessageService, XQuery, XSort, XTableColumn, XTableComponent } from '@ng-nest/ui';
    
import { Qualification } from 'src/main/qualification/qualification.service';
import { AddmethodqualificationComponent } from '../../modifyqualificationmethod/addmethodqualification/addmethodqualification.component';
import { QualificationMethodService } from '../../modifyqualificationmethod/modifyqualificationmethod.service';
import { DispatchRoleTaskService, RoleTestProject } from '../taskdispatch.service';

@Component({
  selector: 'app-modifytaskdispatch',
  templateUrl: './modifytaskdispatch.component.html',
  styleUrls: ['./modifytaskdispatch.component.scss']
})
export class ModifytaskdispatchComponent implements OnInit {

  constructor(private qualimethodservice:QualificationMethodService,
    private roleservice:DispatchRoleTaskService,
    private msgBox:XMessageBoxService,
    private msg:XMessageService) { 
     
  }
  indexChange(index: number) {
    this.tablequery={};
    this.tableindex = index; 
    this.gettableData(); 
  }
  tableindex=1;
  tablesize=20;
  tabledata:Qualification[];
  tablealldata:Qualification[];
  tabletotal=0;
  tablequery:XQuery={};
  @ViewChild('qualtable')qualtable:XTableComponent; 
  roles:RoleTestProject[]=[];
  sortChange(sort: XSort[]) {
    this.tablequery={};
    this.tablequery.sort = sort;
    this.gettableData();
  }
  gettableallData(projectid:number,standardid:number) { 
    this.tableindex=1; 
    this.qualimethodservice.getqualificationmethodprojecttest(projectid,standardid).subscribe((x)=>{
       this.tablealldata =x.list as Qualification[]; 
       this.tablequery={}; 
       this.gettableData(); 
       this.roleservice.getroletaskdispatchs('').subscribe(
         (y)=>
         {
           this.roles=y;
         }
       );
    });
    }
  tablerowchange(item:any)
  {
     
  }
  gettableData()
    { 
      this.qualimethodservice.gethandledata(this.tablealldata,this.tableindex,this.tablesize,this.tablequery)
           .subscribe(
              (x)=>
              { 
                 this.tabletotal =Number(x.total); 
                this.tabledata=[...x.list as any[]];  
             }
           )
    }
  modifyrows:any[]=[];
  ngOnInit(): void {
  }
  rowchange(type:number,item:any)
  {
    var ffindex=this.modifyrows.findIndex((x)=>x.id==item.id);
    if(ffindex==-1)
    {
    switch(type)
    {
      case 1:
        if(item.beforemethodname!=item.methodname)
        {
           this.modifyrows.push(item);
           item.beforemethodname=item.methodname;
        }
      break;
      case 2:
        if(item.beforeroleid!=item.roleid)
        {
        this.modifyrows.push(item);
        item.beforeroleid=item.roleid;
        }
        break;
      default:
        break;
    }
  }
}
  tablecolumns:XTableColumn[] =[
    
    { id: 'index', label: '序号',width:80, type: 'index',flex:1 },
    {id:'role',label:'组别',width:100}  , 
    {id:'firstname',label:'资质',width:100}  , 
    {id:'secondname',label:'分类',width:100}  , 
    { id: 'testproject', label: '项目',width:150},
    {id:'standardname',label:'标准',width:500},
    { id: 'editmethodname', label: '方法', width:300}
     
  ]
  modify=2;
  addvisible=false;
  @ViewChild("addqualificaitonmethod")addqualificaitonmethod:AddmethodqualificationComponent;
  add(tpe:string,item?:Qualification)
  { 
    if(tpe=='add'&&this.qualtable.activatedRow !=null&&this.qualtable.activatedRow !=undefined)
    {
       this.addvisible=true;
       this.addqualificaitonmethod.setMethod(this.qualtable.activatedRow);
    }
  }
  datachange(item:Qualification)
  {
     if(item !=null&&item !=undefined)
     {
         this.qualimethodservice.addqualificationmethod(item).subscribe(
           (x)=>
           {
            var ffindex=this.tablealldata.findIndex((x)=>x.id==this.qualtable.activatedRow?.id);
            if(ffindex !=-1)
            {
              this.tablealldata.splice(ffindex,0,item);
            this.tableindex=1;
            this.tablequery={};
            this.gettableData();
            this.msg.success('添加成功');
            }
             
           }
         );
     }
     this.addvisible=false;
  }
  get disabled()
  {
    return false;
  }
  @Output() SaveModify=new EventEmitter<Qualification>();
  save()
  {
     if(this.modifyrows.length>0)
     {
       this.qualimethodservice.updatequalificationmethod(this.modifyrows).subscribe
       (
        (x)=>
        { 

          //this.msg.success("保存成功!");
          this.modifyrows=[];//更改行清空
          if(this.SaveModify !=undefined)
          {
            this.SaveModify.emit(this.qualtable.activatedRow);
          }
        }
       );
     }
     else if(this.SaveModify !=undefined)
     {
       this.SaveModify.emit(this.qualtable.activatedRow);
     }
  } 
}
