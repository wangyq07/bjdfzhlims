import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { XInputComponent, XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XSort, XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui';
 
import { IndexService } from 'src/layout/index/index.service';
 
import { Customer, CustomersService } from 'src/services/CustomerService';
import { ProjectUtil } from 'src/share/utilclass'; 
 
import { AddcustomersComponent } from './addcustomers/addcustomers.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent   implements OnInit,AfterViewInit {
@Output() private ChangeCustomer=new EventEmitter<Customer>();
@Input() hidebutton='inline';
@Input() customeradaption=500;
  constructor(private service:CustomersService,
              private cdr:ChangeDetectorRef
              , public indexService: IndexService
              ,private msgBox: XMessageBoxService
              ,private msg:XMessageService
            ) { 
            }
  @Input() auth: { [code: string]: boolean } = {};
  ngAfterViewInit(): void { 
     
     this.getalldata(this.indexService.auth.user.id+'');
    this.getData();  
  }
  setActive(contactid:number)
  {
    console.log(this.functiontype);
    var findex= this.data.findIndex((x)=>x.id==contactid);
    if(findex !=-1)
    {
      this.customtable.activatedRow=this.data[findex];
      this.currentCustomer=this.data[findex];
    }
  }
customerchange(selectedrow:XTableRow)
{ 
   this.currentCustomer=selectedrow as Customer; 
   if(this.ChangeCustomer !=undefined)
   this.ChangeCustomer.emit(selectedrow as Customer); 
   if(this.multiple)
   {
    var iitem=this.seldata.findIndex((x)=>x.id==selectedrow.id);
      
    if(iitem==-1&&selectedrow.sel)
      {
        this.seldata.push(selectedrow as Customer);
      } 
      else if(!selectedrow.sel&&iitem>=0)
      {
         this.seldata.splice(iitem,1);
      }
   }
} 
multiple=false;
setselect(ismultiple:boolean=true)
{
  this.getalldata(this.indexService.auth.user.id+'');
  this.getData();
  console.log(this.data);
  this.multiple=ismultiple;
   if(ismultiple)
   {
    this.columns = [
      { id: 'sel', label: '选择', width: 100, left: 0, type: 'checkbox' }, 
      { id: 'customername', label: '客户名称', width: 200, sort: true },
      { id: 'area', label: '区域', width: 300, sort: true },
      { id: 'customeraddress', label: '单位地址', width: 300, sort: true },
      { id: 'email', label: '邮箱', width: 300 },
      { id: 'phone', label: '电话', width: 300 },
      { id: 'contacter', label: '联系人', width: 300, flex: 1, sort: true },
      { id: 'postcode', label: '邮编',width: 300, flex: 1 },
      {id:'remark',label:'备注',width: 700,flex:1} 
    ];
   }
   else
   {
    this.columns = [ 
      { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
      { id: 'actions', label: '操作', width: 100, left: 80 },
      { id: 'customername', label: '客户名称', width: 200, sort: true },
      { id: 'area', label: '区域', width: 300, sort: true },
      { id: 'customeraddress', label: '单位地址', width: 300, sort: true },
      { id: 'email', label: '邮箱', width: 300 },
      { id: 'phone', label: '电话', width: 300 },
      { id: 'contacter', label: '联系人', width: 300, flex: 1, sort: true },
      { id: 'postcode', label: '邮编',width: 300, flex: 1 },
      {id:'remark',label:'备注',width: 700,flex:1} 
    ];
    if(this.seldata.length>0)
    {
     
      this.customtable.activatedRow=  this.data.find((x)=>x.id==this.seldata[0].id);
    }
   }  
   this.data.map(
    (y:any)=>
    {
       if(this.seldata.findIndex((z)=>z.id==y.id) !=-1)
       {
         y.sel=true;
       }
       else
       {
         y.sel=false;
       }
    }
  );
    //[...this.data]; 

}
searchkeydown()
  {
               if(this.searchcustom.value !="")
               {
               this.query.filterLogic='or';
               this.query.filter=[{field:"customername",value:this.searchcustom.value,operation:"%"}
              , {field:"customeraddress",value:this.searchcustom.value,operation:"%"}]; 
                } 
                else
                {
                  this.query.filter=[]; 
                  this.total=this.alldata.length;
                }
                this.getData();
            }
  ngOnInit(): void {
     
  }
  seldata:Customer[]=[];
  data:Customer[]=[];
  alldata:Customer[]=[];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'actions', label: '操作', width: 100, left: 80 },
    { id: 'customername', label: '客户名称', width: 200, sort: true },
    { id: 'area', label: '区域', width: 300, sort: true },
    { id: 'customeraddress', label: '单位地址', width: 300, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', width: 300 },
    { id: 'contacter', label: '联系人', width: 300, flex: 1, sort: true },
    { id: 'postcode', label: '邮编',width: 300, flex: 1 },
    {id:'remark',label:'备注',width: 700,flex:1} 
  ];
  size=50;
  index = 1;
  query: XQuery = {filter:[] };
  total=0; 
  getData() {
     this.service.gethandledata(this.alldata,this.index,this.size,this.query).subscribe(
      (x)=>{
       [this.data, this.total] = [x.list as Customer[], Number(x.total)];
       if(this.total>0)
       {
        if(this.multiple)
        {
         this.data.map(
           (y:any)=>
           {
              if(this.seldata.findIndex((z)=>z.id==y.id) !=-1)
              {
                 
                y.sel=true;
              }
           }
         );

        }
         
          if(this.seldata.length==0)
          {
            this.currentCustomer=this.data[0];
            this.customtable.activatedRow=this.data[0];
          }
          else
          {
           var ffindex= this.data.findIndex((z)=>z.id==this.seldata[0].id);
           if(ffindex!=-1)
           {
            this.currentCustomer=this.data[ffindex];
            this.customtable.activatedRow=this.data[ffindex];
          }
           
        }
       
       if(this.ChangeCustomer !=undefined)
       this.ChangeCustomer.emit(this.data[0]);
      }
      }
    ); 
  }
  @Input() functiontype:any=1;
  @ViewChild('customtable')customtable:XTableComponent;
  @ViewChild('customercomponent')AddcustomersComponent:AddcustomersComponent;
  @ViewChild('searchcustom')searchcustom:XInputComponent;
  visible=false;
  currentCustomer:Customer;
  getalldata(userid:string)
  { 
    this.query={filter:[{field:'userid',value:userid,operation:"="}]}
    this.service.getList(this.index, this.size, this.query)
    .subscribe((x)=>
     {  
      if(this.functiontype==1)
      {
        this.alldata=[];
      x.list?.map(
        (y)=>
        {
          if(y.functiontype==1)
          this.alldata.push(y);
        }
      );
      this.total=this.alldata.length;
      }
      else
      {
        [this.alldata, this.total] = [x.list as Customer[], Number(x.total)];
      }
      this.getData();
      this.cdr.detectChanges(); 
     }
    );
  }
  indexChange(index: number) {
    
    this.index = index; 
    this.getData();
  }
  sortChange(sort: XSort[]) {
    this.query.sort = sort;
    this.getData();
  } 
  handlecustomerchange(obj:string)
     { 
      this.index=1;
      this.size=50;
      this.total=0;
      if(this.AddcustomersComponent.currentcustomer !=null)
      {
        this.currentCustomer=this.AddcustomersComponent.currentcustomer as Customer;
            switch(obj)
            {
              case 'add': 
               
               this.data.push(this.currentCustomer); 
               this.data=this.data.map((x)=>{return x;}); 
               this.customtable.activatedRow=this.currentCustomer;
               if(this.ChangeCustomer !=undefined)
               this.ChangeCustomer.emit(this.currentCustomer);
              break;
              case 'edit': 
               this.data= this.data.map(
                  (x)=>
                  {
                    if(x.id==this.currentCustomer.id)
                    {
                      return this.currentCustomer;
                    }
                    return x;
                  }
                ); 
                break; 
              default: 
                break;
            }
          }
            this.visible=false; 
     }
  action(type:string, item?: any)
  {  
    if(type !="delete")
    {
         
        this.AddcustomersComponent.setcurrent(type,this.indexService.auth.user.id+'',item);
        this.visible=true;
    }
    else
      {
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${item.customername}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.delete(item.id).subscribe((x) => { 
                var delindex=ProjectUtil.setafterdelete(item.id,this.data);
                this.data=   this.data.map((y)=>{return y;});
                this.total=this.data.length;
                this.msg.success('删除成功');
                if(delindex>0)
                {
                   this.currentCustomer=this.data[delindex-1];  
                }  
                this.customtable.activatedRow=this.currentCustomer;
                if(this.ChangeCustomer !=undefined)
                this.ChangeCustomer.emit(this.currentCustomer);
                
              });
          }
        });
      }
  }
}
