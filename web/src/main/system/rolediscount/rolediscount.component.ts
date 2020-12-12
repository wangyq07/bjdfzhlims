import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { XControl, XFormComponent, XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTreeAction, XTreeComponent } from '@ng-nest/ui';
import { map, tap } from 'rxjs/operators';
import { IndexService } from 'src/layout/index/index.service'; 
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
import { OrganizationService } from '../organization/organization.service';
import { RolesService } from '../roles/roles.service';
import { RoleDiscount, RoleDiscountService } from './rolediscount.service';

@Component({
  selector: 'app-rolediscount',
  templateUrl: './rolediscount.component.html',
  styleUrls: ['./rolediscount.component.scss']
})
export class RolediscountComponent extends PageBase implements OnInit {

  @ViewChild('treeCom') treeCom: XTreeComponent;
  //formGroup = new FormGroup({});
 
  get disabled() {
    return !['edit', 'add', 'add-root'].includes(this.type);
  } 
  type = 'info';

  selected: RoleDiscount;

  activatedId: string;

  treeLoading = true;

  data =()=>this.service.getdiscounts().pipe(
    tap(() => (this.treeLoading = false)),
                       map((x)=>x)); 
  treeActions: XTreeAction[] = [ 
    {
      id: 'add',
      label: '新增',
      icon: 'fto-plus-square',
      handler: (node: RoleDiscount) => {
        this.action('add', node);
      }
    },
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: RoleDiscount) => {
        this.action('edit', node);
      }
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: RoleDiscount) => {
        this.action('delete', node);
      }
    }
  ];
  addflow()
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
      control:'input',
      id:'label',
      hidden:true
    }
    ,
    {
      control:'input',
      required:true,
      label:'折扣值',
      id:"discount"
    }
  ];
  constructor(
    private service: RoleDiscountService,  
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
  setformvalue(node:RoleDiscount)
  {
      
    this.service.getrolediscountbyid(node.pid+'',node.role?.id+'').subscribe(
                                          (x:any)=>
                                          { 
                                            var d=x as RoleDiscount; 
                                            if(d !=undefined)
                                            { 
                                              d.label=d.role?.name;
                                              
                                             this.form.formGroup.patchValue(
                                               {
                                                 lable:d.label,
                                                 pid:d.pid,
                                                 role:{label:d.label,id:d.role?.id},
                                                 discount:d.discount
                                               }
                                             );
                                            }
                                            else
                                            {
                                              this.form.formGroup.setValue(
                                                {  
                                                  label:'',
                                                  pid:node.id,
                                                  discount:1,
                                                  role:null,
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

  action(type: string, node: RoleDiscount) {
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
          
            if(node.pid==null)
            {
            this.type = type;
            this.selected = node; 
             
             if(index !=-1)
             {
              this.form.controls[index].hidden=false;
             }
            //this.form.formGroup.reset();
            this.form.formGroup.patchValue({
              id:  ProjectUtil.JsNewGuid(),
              pid: node.id, 
              role:null,
              discount:1
            });
          }
          
          break;
      case 'edit':
        this.type = type;
        //console.log(this.editdisabled);
       
      if(node.pid==null)
        {
          this.action('info',node);
          break;
        }
       
        this.setformvalue(node);
       
         this.form.formGroup.reset();  
        break;
      case 'delete':
        if(node.pid==null)
        {
          this.message.error(`不能删除:${node.label},因为它是根节点`)
          break;
         }
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${node.label}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.deleterolediscount(node).subscribe((x) => {
                this.treeCom.removeNode(node);
                this.form.formGroup.reset();
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'save':
        if (this.type === 'add' || this.type === 'add-root') {
          //this.form.formGroup.value.label=this.form.formGroup.value.role.name;
          this.service.addrolediscount(this.form.formGroup.value).subscribe((x) => {
            this.type = 'info'; 
            this.treeCom.addNode(x);
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.service.updaterolediscount(this.form.formGroup.value).subscribe((x) => {
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
