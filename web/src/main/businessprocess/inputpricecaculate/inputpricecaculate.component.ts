import { Component, Input, ViewChild } from '@angular/core';
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XTableColumn, XTableComponent, XTreeAction, XTreeComponent } from '@ng-nest/ui';
import { map, tap } from 'rxjs/operators';
import { IndexService } from 'src/layout/index/index.service';  
import { QualificationComponent } from 'src/main/qualification/qualification.component';
import { PageBase } from 'src/share/base/base-page';
import { ProjectUtil } from 'src/share/utilclass';
import { PriceProduct, PriceProductService, PriceQualification } from './inputprice.service';

@Component({
  selector: 'app-inputpricecaculate',
  templateUrl: './inputpricecaculate.component.html',
  styleUrls: ['./inputpricecaculate.component.scss']
})
export class InputpricecaculateComponent extends PageBase {
  index = 1;
  query: XQuery = { filter: [] };
  data:PriceQualification[] =[];
    activatedId="";
  treeLoading = true;
  treeData = () =>
    this.priceProductService.getpriceproduct().pipe(
      tap(() => (this.treeLoading = false)),
      map((x) => x.list)
    );
    checkedrow(row:any)
    { 
      var index= this.selquali.findIndex((x)=>x.id==row.id);
      console.log(row);
      if(index ==-1&&row.sel)
      {
       this.selquali[index].exceptionprice=100.0;
       this.selquali.push(this.selquali[index]);
       this.selquali=[...this.selquali];
       console.log(this.selquali);
      }
    }
  selected: PriceProduct;
  columns: XTableColumn[] = [
    { id: 'sel', label: '选择例外',type:'checkbox', width: 100 },
     
    { id: 'actions', label: '操作', width: 100 },
    { id: 'testprojectname', label: '项目', width: 100,   sort: true },
    { id: 'standardprice', label: '标准价格',width:100,  sort: true } ,
    { id: 'standardname', label: '标准' } 

  ];

  @ViewChild('tableCom') tableCom: XTableComponent;

  constructor( 
    public indexService: IndexService,
    private priceProductService: PriceProductService,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {
    super(indexService); 
  }
  tablerowchange(item:any)
  {
    var index= this.selquali.findIndex((x)=>x.id==item.id); 
    if(index ==-1&&item.sel)
    {
    item.exceptionprice=100.0;
     this.selquali.push( item);
     this.selquali=[...this.selquali]; 
    }
    else if(item.sel==false)
    {
      this.delsel(item);
    }
  }
  selquali:any[]=[];
  delsel(delitem:PriceQualification)
  {
   var index= this.selquali.findIndex((x)=>x.id==delitem.id);
   if(index !=-1)
   {
    this.selquali[index].exceptionprice=0.0;
    this.selquali.splice(index,1); 
   }
  }
  tadata:any[];
  quaconfirm()
  {
    var tempdata:any[]=[];
    for(var i=0;i<this.qualificationcomponent.selquali.length;i++)
    {
      tempdata.push({
                            id:ProjectUtil.JsNewGuid() 
                            ,priceid:this.currentNode.id+''
                            ,qualificationid:this.qualificationcomponent.selquali[i].id+''
                            ,testprojectname:this.qualificationcomponent.selquali[i].testproject
                            ,methodname:this.qualificationcomponent.selquali[i].methodname
                            ,standardprice:this.qualificationcomponent.selquali[i].price 
                            ,standardname:this.qualificationcomponent.selquali[i].standardname 
                             });
                            
                          
    } 
    this.priceProductService.getCurrentQualificationexists(tempdata).subscribe(
      (x)=>
      {
        if(x.isexits)
        {
           this.message.error(x.msg);
        }
        else
        {
          this.data=[];  
          this.currentNode.prices=[]; 
          tempdata.map(
             (x:any)=>
             {
              this.currentNode.prices?.push(x);
              this.data.push(x);
             }
          );
        }
      }
    )
    
    
    
   this.total=this.data.length;  
    
  }
  total=0;
  qvisible=false;
  type='info';
  currentNode:PriceProduct={};
  treeaction(type: string, node?: PriceProduct) {
    this.selquali=[];
    if(node !=undefined)
    {
      node.prices?.map(
        (x:any)=>
        {
          if(x.exceptionprice >0)
          {
            this.selquali.push(x);
            x.sel=true;
          }
        }
      );
    }
    
    switch (type) {
      case 'info':
        this.type = type;
        if(node !=undefined)
        {
        this.selected = node;
        this.currentNode=node; 
        if(node.prices !=undefined)
           this.data=node.prices;
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
          prices: this.data
           } ;
        break;
        ; 
      case 'add':
        this.type = type;
         this.data=[]; 
        this.currentNode={
          id: ProjectUtil.JsNewGuid(),
          pid: node?.id,
          label: '',
          prices: this.data
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
              this.priceProductService.deletepriceproduct(node.id).subscribe((x) => {
                if(node !=undefined)
                {
                  
                this.treeCom.removeNode(node); 
                this.message.success('删除成功！');
                 this.currentNode={};
                 this.type="info";
              }
              });
          }
        });
        break;
      case 'save':
         
        if (this.type === 'add-root'||this.type=='add') {
          this.priceProductService.addpriceproduct(this.currentNode).subscribe((x) => { 
            this.treeCom.addNode(x);
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
         
          this.priceProductService.updatepriceproduct(this.currentNode).subscribe((x) => {
            
            this.treeCom.updateNode(this.currentNode, x);
            console.log(this.selquali);
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
      id: 'add',
      label: '添加',
      icon: 'fto-plus',
      handler: (node: PriceProduct) => {
        this.treeaction('add', node);
      }
    } ,
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: PriceProduct) => {
        this.treeaction('delete', node);
      }
    }
    
  ]; 
  get disabled()
  {
    return this.type =="info";
  }
 inputtestcount="none";
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
   /* if(this.currentNode!=undefined&&this.currentNode.formular==undefined)
    {
      this.invalidvisible="inline";
        this.invalidstring="公式为空";
       return true;
    }*/ 
    if(this.currentNode!=undefined&&this.currentNode.formular!=undefined&&this.currentNode.formular!=''&&!this.getstring(this.currentNode.formular))
    {
      this.invalidvisible="inline"; 
       return true;
    }
    if(this.currentNode !=undefined&&this.currentNode.prices!=undefined
       &&this.currentNode.prices.length>0&&(this.currentNode.formular==''&&this.currentNode.perdecreace=='')
      )
      {
        this.invalidvisible="inline";
        this.invalidstring="公式为空";
       return true;
      }
    /*if((this.currentNode==undefined||this.currentNode.prices==undefined
       ||this.currentNode.prices.length<1)&&this.type !='add-root'
      )
      {
        this.invalidvisible="inline";
        this.invalidstring="检测项目为空";
       return true;
      }  */
      return false;
  }
  getstring(st?:string)
  {
    try
    {
      if(st !=undefined)
      {
          st="var n=2;"+st;
          eval(st);
          return true;
      }
    }
    catch
    {
      this.invalidstring="公式不正确";
      return false;
    }
    this.invalidstring="公式不正确";
    return false;
  }
  invalidstring="";
  invalidvisible="none";
}
