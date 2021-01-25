import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
 
import { XControl, XFormComponent, XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTableColumn, XTreeAction, XTreeComponent, XTreeNode } from '@ng-nest/ui';
import { map, tap } from 'rxjs/operators';
import { IndexService } from 'src/layout/index/index.service';
import { FlowNodeService, FlowRole, FlowTask, FlowSpecialDispatch, CommonTypeService } from './flownode.service';
import { PageBase } from 'src/share/base/base-page';
import {MenusService } from 'src/main/system/menus/menus.service';
import { RolesService } from 'src/main/system/roles/roles.service';
import { OrganizationService } from 'src/main/system/organization/organization.service';
import { FlowService } from '../flowprocess/flowhandle.service'; 
import { Observable } from 'rxjs';
import { ProjectUtil } from 'src/share/utilclass';
@Component({
  selector: 'app-flownode',
  templateUrl: './flownode.component.html',
  styleUrls: ['./flownode.component.scss']
})
export class FlownodeComponent extends PageBase implements OnInit,AfterViewInit {

  @ViewChild('treeCom') treeCom: XTreeComponent;
  //formGroup = new FormGroup({});
 
  get disabled() {
    return !['edit', 'add', 'add-root'].includes(this.type);
  }

  type = 'info';

  selected: FlowTask;

  activatedId: string;

  treeLoading = true;

  data =()=>this.processservice.getallProcesses().pipe(
    tap(() => (this.treeLoading = false)),
                       map((x)=>x.list)); 
  treeActions: XTreeAction[] = [ 
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: FlowTask) => {
        this.action('edit', node);
      }
    }
  ];
  addflow()
  {
    this.processservice.deployDiagram('LimsTestProcess').subscribe(
      (x)=>
      {
        
        this.processservice.getallProcesses().subscribe((y)=>{
          this.service.bymaxid(y.maxid,y.currentid).subscribe(
            (z)=>
            {
               this.data=y.list;
            }
          );
          
        });
         
      }
    );
  }
   
  nodeName="";
  constructor(
    private service: FlowNodeService,
    private menuservice:MenusService,
    private processservice:FlowService,
    public indexService: IndexService,
    private message: XMessageService,
    private msgBox: XMessageBoxService,
    private roleservice:RolesService
    ,private organization:OrganizationService
    ,private cd: ChangeDetectorRef
    ,private commonservice:CommonTypeService
  ) {
    super(indexService);
  }
  ngAfterViewInit(): void {
     this.cd.detectChanges();
     this.processservice.getallProcesses();
  }
  setformvalue(node:FlowTask)
  { 
    this.service.getList(1,100,{filter:[{field:'id',value:node.tasknodeid+'',operation:"="},
                                         {field:'flowid',value:node.pid+'',operation:'='} 
                                        ]}).subscribe(
                                          (x:any)=>
                                          {
                                            this.specialroles=[];
                                            this.handleclass='';
                                            var d=x as FlowTask; 
                                            if(d !=undefined)
                                            {
                                              d.roles?.map((y:any)=>
                                              {
                                                y.label=y.name;
                                              }
                                              );
                                             
                                              this.nodeName=d.label+'';
                                              this.menuName=d.menu; 
                                              if(d.roles !=undefined)
                                              this.selroles=d.roles;
                                              if(d.handleclass !=undefined) 
                                              this.handleclass=d.handleclass+'';
                                             var fin= d.specialdispatch?.find((z)=>z.id !=null);
                                             
                                             if(fin !=null && fin !=undefined)
                                             {
                                              this.specialroles=d.specialdispatch as any[];
                                              this.specialroles.map(
                                                (z)=>z.role.label=z.role.name
                                              );
                                              this.specialroles=[...this.specialroles];
                                              console.log(this.specialroles);
                                            }
                                            }
                                            else
                                            {
                                              this.nodeName=node.label+'';
                                              this.menuName=null; 
                                              this.selroles=[];
                                              this.handleclass="";
                                             
                                            }
                                          }
                                        );
   
  } 
  ngOnInit() {
    this.treeActions = this.treeActions.filter((x) => this.auth[x.id]);
      this.menuservice.getList(1, Number.MAX_SAFE_INTEGER, {
      sort: [
        { field: 'pid', value: 'asc' },
        { field: 'sort', value: 'asc' }
      ]
    }).subscribe(
      (x)=>
      { 
      this.menuData=x.list as any[]
      
      }
    );
  
    
   
  }
  conditiondata:any[]=[];
  specialroles:any[]=[];
  specialrolecolumns:XTableColumn[]=[
    {id:'actions',width:150,label:'条件'}, 
    {id:'role',width:200,label:'角色'},
    {id:'excpression',width:300,label:'条件语句'}
  ];
  handleclass="";
  add()
  {
    this.specialroles.push({
                             id:ProjectUtil.JsNewGuid()+'',
                             flowid:this.selected.pid,
                             tasknodeid:this.selected.tasknodeid
                            });
                            this.specialroles=[...this.specialroles];
                            
  }
  action(type: string, node: FlowTask) {
    this.cd.detectChanges();
    this.commonservice.getspecialdispatch(node.tasknodeid+'').subscribe(
      (x)=>
      {
        this.conditiondata=x.list;
      }
    )
    switch (type) {
      case 'info':
        this.type = type;
        this.selected = node; 
        this.setformvalue(node);
        break; 
      case 'edit':
        if(node.pid==null)
        {
          this.action('info',node);
          break;
        }
        this.type = type;
        this.selected=node;
        this.setformvalue(node);
        break;
      case 'delete':
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${node.label}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.delete(node.id).subscribe((x) => {
                this.treeCom.removeNode(node); 
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'save':
          this.specialroles.map(
            (x)=>
            {
              var ffind=this.conditiondata.find((y)=>y.id==x.conditionid);
              if(ffind !=undefined&&ffind !=null)
              {
                x.conditionname=ffind.label;
              }
            }
          );
           this.service.post(
             {
               id:node.id,
               flowid:node.pid,
               tasknodeid:node.tasknodeid,
               menu:this.menuName,
                roles:this.selroles,
                handleclass:this.handleclass,
                specialdispatch:this.specialroles,
                processkey:node.processkey,
                label:node.label,
                pid:node.pid,
                sort:node.sort
             }
           ).subscribe((x) => {
            this.type = 'info'; 
            this.message.success('修改成功！');
          }); 
         
        break;
      case 'cancel':
        this.type = 'info';
        //this.form.formGroup.reset();
        break;
    }
  }
  menuData:any[]; 
  menuName:any;
  
    rolescolumns:XTableColumn[]= [
      { id: 'index', label: '序号', width: 80, left: 0, type: 'index' },
      { id: 'name', label: '角色名称', flex: 1, sort: true }
    ]; 
    rolesdata=(index: number, size: number, query: XQuery) =>
    this.roleservice.getList(index, size, query).pipe(
      map((x) => {
        x.list = x.list?.map((y: any) => {
          y.label = y.name;
          return y;
        });
        return x;
      })
    );
     TreeData=this.organization.getList(1, Number.MAX_SAFE_INTEGER,{}).pipe(map((x) => x.list as XTreeNode[])); 
  selroles:FlowRole[]=[];
}
