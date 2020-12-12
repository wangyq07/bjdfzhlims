import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
 
import { XControl, XFormComponent, XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTreeAction, XTreeComponent } from '@ng-nest/ui';
import { map, tap } from 'rxjs/operators';
import { IndexService } from 'src/layout/index/index.service';
import { FlowNodeService, FlowTask } from './flownode.service';
import { PageBase } from 'src/share/base/base-page';
import {MenusService } from 'src/main/system/menus/menus.service';
import { RolesService } from 'src/main/system/roles/roles.service';
import { OrganizationService } from 'src/main/system/organization/organization.service';
import { FlowService } from '../flowprocess/flowhandle.service'; 
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
                       map((x)=>x)); 
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
        console.log(x);
        this.processservice.getallProcesses().subscribe((x)=>{
          this.data=x
          
        });
         
      }
    );
  }
  controls: XControl[] = [
    
    {
      control:'input',
      id:'flowid',
      label:'当前flowid',
      hidden:true
    },
    {
      control:'input',
      id:'tasknodeid',
      label:'当前flowid',
      hidden:true
    },
    {
      control:'input',
      id:'processkey',
      label:'当前flowid',
      hidden:true
    },
    {
      control: 'input',
      id: 'label',
      label: '节点名称',
      required: true,
      readonly:true,
      maxlength: 20 
    },
    {
      control: 'find',
      id: 'menu',
      label: '功能连接', 
      required: true,
      multiple: false,
      treeData:   () =>this.menuservice.getList(1, Number.MAX_SAFE_INTEGER, {
        sort: [
          { field: 'pid', value: 'asc' },
          { field: 'sort', value: 'asc' }
        ]
      })
      .pipe(
        tap(() => (this.treeLoading = false)),
        map((x) => x.list)
      ),
    },
    {
      control: 'find',
      id: 'roles',
      label: '角色',
      required: true,
      multiple: true,
      treeData:   () => this.organization.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list)),
      tableData:  (index: number, size: number, query: XQuery) =>
        this.roleservice.getList(index, size, query).pipe(
          map((x) => {
            x.list = x.list?.map((y: any) => {
              y.label = y.name;
              return y;
            });
            return x;
          })
        ) ,
      tableColumns: [
        { id: 'index', label: '序号', width: 80, left: 0, type: 'index' },
        { id: 'name', label: '角色名称', flex: 1, sort: true }
      ],
      tableRowHeight: 35,
      treeTableConnect: 'organizationId'
    } 
  ];
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
                                             
                                            var d=x as FlowTask; 
                                            if(d !=undefined)
                                            {
                                              d.roles?.map((y:any)=>
                                              {
                                                y.label=y.name;
                                              }
                                              );
                                             this.form.formGroup.patchValue(d);
                                            }
                                            else
                                            {
                                              this.form.formGroup.setValue(
                                                { 
                                                  //id:node.id+node.pid,
                                                  tasknodeid:node.tasknodeid,
                                                  label:node.label,
                                                  flowid:node.pid==null?'':node.pid,
                                                  processkey:node.processkey,
                                                  menu:null,
                                                  roles:[],
                                                }
                                              );
                                            }
                                          }
                                        );
   
  }
  @ViewChild("form")form:XFormComponent;
  ngOnInit() {
    this.treeActions = this.treeActions.filter((x) => this.auth[x.id]);
     
  }

  action(type: string, node: FlowTask) {
    this.cd.detectChanges();
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
                this.form.formGroup.reset();
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'save':
          this.service.post(this.form.formGroup.value).subscribe((x) => {
            this.type = 'info'; 
            this.message.success('修改成功！');
          }); 
         console.log(this.form.formGroup.value);
        break;
      case 'cancel':
        this.type = 'info';
        this.form.formGroup.reset();
        break;
    }
  }
   

}
