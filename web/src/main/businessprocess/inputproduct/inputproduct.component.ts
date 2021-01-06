import { Component, OnInit, ViewChild } from '@angular/core';
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTableColumn, XTableComponent, XTreeAction, XTreeComponent } from '@ng-nest/ui';
import { map, tap } from 'rxjs/operators';
import { IndexService } from 'src/layout/index/index.service';
import { QualificationComponent } from 'src/main/qualification/qualification.component';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
import { Product, ProductQualification, ProductService } from './inputproduct.service';

@Component({
  selector: 'app-inputproduct',
  templateUrl: './inputproduct.component.html',
  styleUrls: ['./inputproduct.component.scss']
})
export class InputproductComponent extends PageBase {
  index = 1;
  query: XQuery = { filter: [] };
  data:ProductQualification[] =[];
    activatedId="";
  treeLoading = true;
  treeData = () =>
    this.productService.getproduct().pipe(
      tap(() => (this.treeLoading = false)),
      map((x) => x.list)
    );
  selected: Product;
  inputtestcount="none";
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80,  type: 'index' },
    { id: 'actions', label: '操作', width: 100 },
    { id: 'testprojectname', label: '项目', width: 100,   sort: true },
    { id: 'standardname', label: '标准' },
    { id: 'methodname', label: '方法' }
  ];

  @ViewChild('tableCom') tableCom: XTableComponent;

  constructor( 
    public indexService: IndexService,
    private productService: ProductService,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {
    super(indexService);
  }
  quaconfirm()
  {
    var tempdata:any[]=[];
    for(var i=0;i<this.qualificationcomponent.selquali.length;i++)
    {
      tempdata.push({
                            id:ProjectUtil.JsNewGuid() 
                            ,productid:this.currentNode.id+''
                            ,qualificationid:this.qualificationcomponent.selquali[i].id+''
                            ,testprojectname:this.qualificationcomponent.selquali[i].testproject
                            ,methodname:this.qualificationcomponent.selquali[i].methodname
                            ,standardprice:this.qualificationcomponent.selquali[i].price  
                            ,standardname:this.qualificationcomponent.selquali[i].standardname
                             }); 
                          
                        }  
        
          this.data=[];  
          this.currentNode.testprojects=[]; 
          tempdata.map(
             (x:any)=>
             {
              this.currentNode.testprojects?.push(x);
              this.data.push(x);
             }
          );
        
       
    
    
    
    
   this.total=this.data.length;  
    
  }
  total=0;
  qvisible=false;
  type='info';
  currentNode:any={};
  treeaction(type: string, node?: Product) {
    switch (type) {
      case 'info':
        this.type = type;
        if(node !=undefined)
        {
        this.selected = node;
        this.currentNode=node; 
        if(node.testprojects !=undefined)
           this.data=node.testprojects;
           else
             this.data=[]; 
        }
        break; 
      case 'add-root':
        this.type = type;
         this.data=[]; 
        this.currentNode={
          id: ProjectUtil.JsNewGuid(),
          pid: undefined,
          label: '',
          testprojects: this.data
           } ;
        break;
      case 'edit':
        this.treeaction('info',node);
        this.type = type;
        
        break;
      case 'delete':
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${node?.label}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&node !=undefined&&
              this.productService.deleteproduct(node.id).subscribe((x) => {
                if(node !=undefined)
                {
                this.treeCom.removeNode(node); 
                this.message.success('删除成功！');
              }
              });
          }
        });
        break;
      case 'save':
         
        if (this.type === 'add-root') {
          this.productService.addproduct(this.currentNode).subscribe((x) => {
            this.type = 'info'; 
            this.treeCom.addNode(x);
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.productService.updateproduct(this.currentNode).subscribe((x) => {
            this.type = 'info';
            this.treeCom.updateNode(this.currentNode, this.currentNode);
            this.message.success('修改成功！');
          });
        }
        break;
      case 'cancel':
        this.type = 'info'; 
        break; 
    }
  }
  @ViewChild("selqual") qualificationcomponent:QualificationComponent;
  @ViewChild("treeCom")treeCom:XTreeComponent;
  action(type: string, item?: any) {
    switch (type) { 
        case 'add':
          this.qvisible=true;
          this.qualificationcomponent.selquali=[];
          this.data.forEach(
            (x:any)=>
            {
              this.qualificationcomponent.selquali.push({id:Number(x.qualificationid),testproject:x.testprojectname,testcount:1});
            }
          );
          this.qualificationcomponent.refreshdata();
          break;
          case 'delete': 
          this.deleteprojectmethod(item?.id+'',this.data) ;
          this.data=[...this.data];  
       break;
  }
 }
 deleteprojectmethod(id?:string,data?:any[])
 {
     var index= data?.findIndex((x)=>{return x.id===id});  
      data?.splice(Number(index),1);    
 }
  treeActions: XTreeAction[] = [ 
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: Product) => {
        this.treeaction('edit', node);
      }
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: Product) => {
        this.treeaction('delete', node);
      }
    }
  ]; 
  get disabled()
  {
    return this.type =="info";
  }
  get invalidsave()
  {
    this.invalidvisible="none";
    this.invalidstring="";  
    if(this.currentNode==undefined||this.currentNode.label==undefined||this.currentNode.label=="")
    {
      this.invalidvisible="inline";
        this.invalidstring="名称为空";
       return true;
    } 
    if(this.currentNode==undefined||this.currentNode.testprojects==undefined
       ||this.currentNode.testprojects.length<=1
      )
      {
        this.invalidvisible="inline";
        this.invalidstring="检测项目为空";
       return true;
      }  
      return false;
  }
   
  invalidstring="";
  invalidvisible="none";
}
