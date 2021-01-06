import { ChangeDetectorRef,DoCheck, Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
 
import { XControl, XFormComponent, XMessageService } from '@ng-nest/ui'; 
import { map } from 'rxjs/operators';
import { ProvinceService } from 'src/services/province.service';
import { CustomersService,Customer } from 'src/services/CustomerService';
@Component({
  selector: 'app-addcustomers',
  templateUrl: './addcustomers.component.html',
  styleUrls: ['./addcustomers.component.scss'],
  providers:[ProvinceService]
})
export class AddcustomersComponent   implements OnInit,DoCheck,AfterViewInit {
  id: string | null;
  type: string | null; 
  config = {
    labelWidth: '6rem'
  };
  selected: any; 
  selectedprovince:any;
  currentcustomer?:Customer;
  @Input() functiontype=1;
  @Output() private sendmessage=new EventEmitter<string>();
  controls: XControl[] = [
    {
      control: 'input',
      id: 'customername',
      label: '客户名称',
      required: true,
      maxlength: 50,
      pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]/, 
    },
    {
      control: 'input',
      id: 'functiontype',
      label: '',
       hidden:true, 
    },
    {
      control: 'input',
      id: 'customeraddress',
      label: '单位地址', 
      required: true,
      maxlength: 50,
      pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]/,
      
    },
    {
      control: 'find',
      id: 'customertype',
      label: '客户类型',
      hidden:false,
      required: false,
      multiple: false,
      treeData: () =>[{id:'1',label:'大客户'},{id:'2',label:'普通客户'}]
    },
    {
      control: 'find',
      id: 'area',
      label: '省份',
      required:  false, 
      hidden:true,
      multiple: false,
      treeData: () =>this.provservice.getList(1,50).pipe(map((x) => x.list))
    },
    { control: 'input', id: 'contacter', label: '联系人姓名', required: false },
    { control: 'input', id: 'phone', label: '联系人电话',required: false},
    { control: 'input', id: 'fax', label: '传真'},
    { control: 'input', id: 'email', label: '邮箱' }, 
    {control:'input',id:'postcode',label:'邮编'}
];

  @ViewChild('form') form: XFormComponent;

  get formInvalid() {
    return this.form?.formGroup?.invalid;
  }

  get disabled() {
    return this.type === 'info';
  }
   
  constructor(  
    private message: XMessageService, 
    private cdr: ChangeDetectorRef, 
    private service:CustomersService
    ,private  provservice:ProvinceService
  ) {
    
  }
  ngDoCheck(): void {
    
  }
 
  setinitcustomer(cus:Customer)
  {
    this.id=cus.id+""; 
      this.form.formGroup.setValue(
        { 
          customername:cus.customername,
          contacter:cus.contacter,
          customeraddress:cus.customeraddress,
          phone:cus.phone,
          email:cus.email,
          functiontype:cus.functiontype,
          customertype:{id:cus.customertype?.id,label:cus.customertype?.customertype},
          fax:cus.fax,
          postcode:cus.postcode,
          area:cus.area==undefined?1:this.provservice.getidbyname(cus.area)
        }
      );
      this.selectedprovince=this.provservice.getidbyname(cus.area+'');
      this.selected= 
      {
        id: cus.customertype?.id==undefined?2:cus.customertype.id,
        label:cus.customertype?.customertype==undefined?"普通客户":cus.customertype.customertype
      }; 
      if (this.selected.id) {
        (this.controls.find((x) => x.id === 'customertype') as XControl).value = [this.selected];
      }
      if(this.selectedprovince !=undefined&&this.selectedprovince.id)
      {
        (this.controls.find((x) => x.id === 'area') as XControl).value = [this.selectedprovince];
      }
  }
  userid:string;
  setcurrent(type:string,uid:string,cus?:any)
  {
    this.userid=uid;
    this.currentcustomer=cus;
    this.type=type; 
    if(cus !=null)
    {
      this.setinitcustomer(cus);
    }
    else
    {
      this.form.formGroup.setValue(
        { 
          customername:'',
          contacter:'',
          customeraddress:'',
          phone:'',
          email:'',
          customertype:{id:2,label:'普通客户'},
          functiontype:this.functiontype,
          fax:'',
          area:{id:1,label:'北京'},
          postcode:''
        } 
      );
       
      
    }
  }
  ngOnInit() {
    //this.action(this.type);
    
  }
  
  ngAfterViewInit() {
    this.cdr.detectChanges();
   switch(this.functiontype)
   {
     case 1:
       {
        this.controls=[
          {
            control: 'input',
            id: 'customername',
            label: '客户名称',
            required: true,
            maxlength: 50,
            pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]/, 
          },
          {
            control: 'input',
            id: 'functiontype',
            label: '',
             hidden:true, 
          },
          {
            control: 'input',
            id: 'customeraddress',
            label: '单位地址', 
            required: true,
            maxlength: 50,
            pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]/,
            
          },
          {
            control: 'find',
            id: 'customertype',
            label: '客户类型',
            hidden:false,
            required: false,
            multiple: false,
            treeData: () =>[{id:'1',label:'大客户'},{id:'2',label:'普通客户'}]
          },
          {
            control: 'find',
            id: 'area',
            label: '省份',
            required:  false, 
            hidden:false,
            multiple: false,
            treeData: () =>this.provservice.getList(1,50).pipe(map((x) => x.list))
          },
          { control: 'input', id: 'contacter', label: '联系人姓名', required: true },
          { control: 'input', id: 'phone', label: '联系人电话',required: true},
          { control: 'input', id: 'fax', label: '传真'},
          { control: 'input', id: 'email', label: '邮箱' }, 
          {control:'input',id:'postcode',label:'邮编'}
        ];
       }
       break;
     case 2:
      this.controls=[
        {
          control: 'input',
          id: 'customername',
          label: '客户名称',
          required: true,
          maxlength: 50,
          pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]/, 
        },
        {
          control: 'input',
          id: 'functiontype',
          label: '',
           hidden:true, 
        },
        {
          control: 'input',
          id: 'customeraddress',
          label: '单位地址', 
          required:  false,
          maxlength: 50,
          pattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]/,
          
        },
        {
          control: 'find',
          id: 'customertype',
          label: '客户类型',
          required:  false,
          hidden:true,
          multiple: false,
          treeData: () =>[{id:'1',label:'大客户'},{id:'2',label:'普通客户'}]
        },
        {
          control: 'find',
          id: 'area',
          label: '省份',
          hidden:true,
          required: false,
          
          multiple: false,
          treeData: () =>this.provservice.getList(1,50).pipe(map((x) => x.list))
        },
        { control: 'input', id: 'contacter', label: '联系人姓名', required:  false  },
        { control: 'input', id: 'phone', label: '联系人电话',required:false},
        { control: 'input', id: 'fax', label: '传真'},
        { control: 'input', id: 'email', label: '邮箱' }, 
        {control:'input',id:'postcode',label:'邮编'}
      ];
       break;
   }
          
         
  } 
  action(type: string | null) {
    switch (type) {
      case 'info': 
        break;
      case 'edit': 
        break;
      case 'save':
           
          this.form.formGroup.value['area']=this.form.formGroup.value['area'].label;
          this.form.formGroup.value['userid']=this.userid;
        if (this.type === 'add') { 
          this.service.post(this.form.formGroup.value).subscribe((x) => {
            this.currentcustomer=x; 
           
            this.message.success('新增成功！'); 
             this.sendmessage.emit("add");
          });
        } else if (this.type === 'edit') {
          this.form.formGroup.value["id"]=this.id; 
          this.currentcustomer=this.form.formGroup.value;
          this.service.put( this.form.formGroup.value).subscribe((x) => {
            this.message.success('修改成功！');
            this.sendmessage.emit("edit");
          });
        }

        break;
      case 'cancel':
        this.sendmessage.emit("cancel");
        break;
    }
  }
 
   
}
