import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { XControl, XFormComponent, XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTreeAction, XTreeComponent } from '@ng-nest/ui';
 
import { map, tap } from 'rxjs/operators';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
import { OrganizationService } from '../organization/organization.service'; 
import { RolesService } from '../roles/roles.service';
import { RoleAuditSetting, RoleAuditSettingService } from './roleautidtset-service';

@Component({
  selector: 'app-roleauditset',
  templateUrl: './roleauditset.component.html',
  styleUrls: ['./roleauditset.component.scss']
})
export class RoleauditsetComponent  extends PageBase implements OnInit {

  @ViewChild('treeCom') treeCom: XTreeComponent;
  //formGroup = new FormGroup({});
 
  get disabled() {
    return !['edit', 'add'].includes(this.type);
  } 
  type = 'info';

  selected: RoleAuditSetting;

  activatedId: string;

  treeLoading = true;

  data =()=>this.service.getallsetings().pipe(
    tap(() => (this.treeLoading = false)),
                       map((x)=>x)); 
  treeActions: XTreeAction[] = [  
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: RoleAuditSetting) => {
        this.action('edit', node);
      }
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: RoleAuditSetting) => {
        this.action('delete', node);
      }
    }
  ];
  addrole()
  {
    
  }
    
  controls: XControl[] = [
    {
      control: 'find', 
      id: 'role',
      label: '角色',
      required: true,
      multiple: false,
      treeData: () => this.organization.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) =>x.list)),
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
    },
    {
      control:'input',
      id:'pid',
      hidden:true
    }, 
    {
      control:'textarea',
      required:true,
      label:'变量',
      id:"auditjson",
      maxlength:100
    }
  ];
  constructor(
    private service: RoleAuditSettingService,  
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
     
  }
  setformvalue(node:RoleAuditSetting)
  { 
   this.service.getsettingbyid(node.id).subscribe((x)=>
   {
      var nd=x as RoleAuditSetting;
      if(nd !=undefined)
      {
        this.form.formGroup.patchValue(nd);
      }
   })
  }
  @ViewChild("form")form:XFormComponent;
  ngOnInit() {
    this.treeActions = this.treeActions.filter((x) => this.auth[x.id]);
     
  }

  action(type: string, node: RoleAuditSetting) {
      this.cd.detectChanges(); 
      var index=this.form.controls.findIndex((x:any)=>x.id=='role');
             if(index !=-1)
             {
              this.form.controls[index].hidden=true;
             } 
    switch (type) {
      case 'info':
        this.type = type;
        this.selected = node; 
        this.setformvalue(node);
        break; 
        case 'add':  
            this.type = type;
            console.log(type);
            this.selected = node;  
             if(index !=-1)
             {
              this.form.controls[index].hidden=false;
             } 
            this.form.formGroup.patchValue({
              id:  ProjectUtil.JsNewGuid(),
              pid: null, 
              role:null,
              auditjson:''
            }); 
          break;
      case 'edit':
        this.type = type;  
        this.setformvalue(node); 
         //this.form.formGroup.reset();  
        break;
      case 'delete': 
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${node.label}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.deletesetting(node).subscribe((x) => {
                this.treeCom.removeNode(node);
                this.data=()=> this.service.getallsetings()
                .pipe(tap(() => (this.treeLoading = false)),
                map((x)=>x)); 
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'save':
        if (this.type === 'add' || this.type === 'add-root') { 
          this.service.addsetting(this.form.formGroup.value).subscribe((x) => {
            this.type = 'info'; 
            this.treeCom.addNode(x);
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.service.updatesetting(this.form.formGroup.value).subscribe((x) => {
            this.type = 'info';
            this.treeCom.updateNode(node, x);
            this.message.success('修改成功！');
          });
        }
        break;
      case 'cancel':
        this.type = 'info';
        this.form.formGroup.reset();
        break;
    }
  }

}
