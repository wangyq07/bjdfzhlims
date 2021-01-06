import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { XMessageBoxAction, XMessageBoxService, XMessageService, XQuery, XSort, XTableColumn, XTableComponent, XTreeComponent } from '@ng-nest/ui';
import { ProjectUtil } from 'src/share/utilclass';
import { Product, ProductService } from '../businessprocess/inputproduct/inputproduct.service';
import { AddQualificationComponent } from './addqualificaiton/addqualificaiton.component';
import {  QualificationCompanyService, QualificationServicebyid, Qualification, QualificationCompany, QualificationService, TestProject, TestProjectService } from './qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent  implements OnInit {
  @ViewChild('treeCom') treeCom: XTreeComponent;
  @ViewChild('producttreeCom') producttreeCom: XTreeComponent;
  @ViewChild('qualtable')qualtable:XTableComponent; 
  projectsearchkey="";
  methodsearchkey="";
  productsearchkey="";
  productsearch()
  {
     if(this.productsearchkey!="")
     {  
        this.productService.getsearchproductlist(this.productsearchkey)
        .subscribe(
          (x)=>
          {
            this.productdata=x.list;
          }
        );
     }
     else
     {
      this.productService.getproduct()
      .subscribe(
        (x)=>
        {
          this.productdata=x.list;
        }
      );
     }
  }

  search()
  {
      this.checkedAll=false;
     if(this.projectsearchkey!=""||this.methodsearchkey)
     { 

        this.qualservice.getqualificationbysearchkey(this.company,this.projectsearchkey,this.methodsearchkey)
        .subscribe(
          (x)=>
          {
            this.tablealldata=x as Qualification[];
            this.tableindex=1;
            this.tablequery={filter:[]}; 
            this.gettableData();
          }
        );
     }
  }
  addvisible=false;
  @ViewChild("addqualificaiton")addqualificaiton:AddQualificationComponent;
  add(tpe:string,item?:Qualification)
  {
    this.type=tpe;
    if(tpe !="delete")
    {
    this.addvisible=true;
    if(this.addqualificaiton !=undefined)
    {
      this.addqualificaiton.companyid=this.company;
    }
    
     if(tpe=='add')
     {
       item={firstid:616,secondid:617};
     }
    this.addqualificaiton.setqualificaiotndata(tpe,item);
   }
   else
   {
    this.msgBox.confirm({
      title: '提示',
      content: `此操作将永久删除此条数据：${item?.testproject}，是否继续？`,
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if(action === 'confirm'&&item !=undefined)
            {
              this.qualservice.deletequalification(item.id+'').subscribe(
                (x)=>
                {
                  var ffindex = this.tablealldata.findIndex((z)=>z.id==item?.id);
                  if(ffindex !=-1)
                  {
                    this.tablealldata.splice(ffindex,1);
                  }
                  ffindex = this.tabledata.findIndex((z)=>z.id==item?.id);
                  if(ffindex !=-1)
                  {
                    this.tabledata.splice(ffindex,1);
                    this.tabledata=[...this.tabledata];
                  }
                }
              ); 
      }
    }
    });
   }
   
  }
  handleadd()
  {
    
  }
  delsel(delitem:Qualification)
  {
   var index= this.selquali.findIndex((x)=>x.id==delitem.id);
   if(index !=-1)
   {
    this.selquali.splice(index,1);
    this.gettableData();
   }
  }
  refreshdata()
  { 
    this.gettableData(); 
  }
  checkedAll=false;
  checkedAllChange()
  {
    if(this.checkedAll)
    {
      if(this.selquali !=undefined)
      {
        this.tabledata.map(
          (x:any)=>
          {
            x.checkbox=true;
           
            var ffindex=this.selquali.findIndex((z)=>z.id==x.id);
            if(ffindex==-1)
            {
             this.selquali.push(x);
            }
          }
        );
      }
    }
    else if(this.selquali !=undefined)
    {
     this.tabledata.map(
       (x:any)=>
       {
         x.checkbox=false;
         var ffindex=this.selquali.findIndex((z)=>z.id==x.id);
     
         if(ffindex !=-1)
         {
          this.selquali.splice(ffindex,1);
         }
       }
     );
   }
   this.tabledata=[...this.tabledata];
   this.selquali=[...this.selquali];
  }

  formGroup = new FormGroup({});
  data:TestProject[]; 
  selquali:Qualification[]=[];
  treeLoading = true;
   type:string;
   selected:TestProject;
   activatedId:string;
   productactivatedId:string;
   productSelected:Product;
  constructor(private service:TestProjectService,
    private qualservice:QualificationService,
    private productService:ProductService,
    private cdr: ChangeDetectorRef,
    private comanyservice:QualificationCompanyService,
    private  Qualifis:QualificationServicebyid,
    private msgBox:XMessageBoxService,
    private msg:XMessageService
    
    ) {
       
    }
  ngAfterContentInit(): void { 
    this.getData(false);
  }
  @Input() tablespan=19;
  @Input() treespan=5;
  @Input() modify=0;
  tabledata:Qualification[]=[];
  tablealldata:Qualification[]=[];
  tableindex=1;
  tabletotal=0;
  tablesize=20;
  tablequery:XQuery={};
  tablecolumns:XTableColumn[] =[
    {id:'checkbox',type:"checkbox",label:"全选",width:80}, 
    { id: 'index', label: '序号',width:80, type: 'index',flex:1 }, 
    { id: 'testproject', label: '项目',width:150},
    {id:'standardname',label:'标准',width:500},
    { id: 'methodname', label: '方法', width:300},   
    { id: 'price', label: '价格', width:100}  
  ]
  action( node: TestProject) { 
        this.selected = node; 
        this.tableindex=1;
        this.gettableallData(node.id); 
        this.checkedAll=false;
  }
  productaction( node: Product) { 
    this.productSelected=node;
    this.productService.getqualificationbyproduct(node.id).subscribe(
      (x)=>
      {
         this.tablealldata=x.list;
         this.tabletotal=x.total;
         this.tableindex=1;
         this.tablesize=20;
         this.tablequery={}; 
         this.gettableData();
         this.checkedAll=false;
      }
    );
}
  ngDoCheck(): void { 
    
    if(this.company !=undefined
      &&this.company !=this.oldcompany
      )
      {
        this.tableindex=1;
        this.tablesize=1000;  
        this.oldcompany=this.company;
        if(this.data !=undefined&&this.data.length>0)
        this.gettableallData(this.data[0].id); 
      }
  }
  checkproductaction( node: Product)
  {
    this.productSelected=node;
    this.productService.getqualificationbyproduct(node.id).subscribe(
      (x)=>
      {
         this.tablealldata=x.list;
         this.tabletotal=x.total;
         this.tableindex=1;
         this.tablesize=20;
         this.tablequery={}; 
         this.gettableData();
     if(node.checked)
     {
        node.testprojects?.map(
          (x)=>
          {
           var ffindex= this.selquali.findIndex((y)=>y.id==x.qualificationid);
           if(ffindex ==-1)
           {
              this.selquali.push(
                {
                id: x.qualificationid,
                testproject:x.testprojectname,
                methodname:x.methodname,
                testcount:1
                } 
            );
           }
          }
        )
     }
     else
     {
      node.testprojects?.map(
        (x)=>
        {
            var ffindex= this.selquali.findIndex((y)=>y.id==x.qualificationid);
            if(ffindex !=-1)
            {
              this.selquali.splice(ffindex,1);
            }
        }
      )
     }
     this.gettableData();
    }
    );
  }
  ngAfterViewInit(): void {    
    if(this.modify==0)
    {
      this.tablecolumns=[
       
         {id:"actions",label:'操作',width:80},
        { id: 'testproject', label: '项目',width:150},
        { id: 'standardname', label: '标准',width:600},
        { id: 'methodname', label: '方法', width:150},  
        { id: 'price', label: '价格', width:100}  
      ]
    }
    else if(this.modify==2)
    {
      this.tablecolumns=[
       
        
       { id: 'testproject', label: '项目',width:150},
       { id: 'standardname', label: '标准',width:600},
       { id: 'methodname', label: '方法', width:150},  
       { id: 'price', label: '价格', width:100}  
     ]
    }
  }
  @ViewChild("rrow")rrow:HTMLDivElement;
  ngOnInit() {  
  }
  
  get disabled()
  {
    return false;
  }
  productdata:Product[]=[]; 
   @Input() producthidden="none";
   @Input()qualitreeheight="600px";
   @Input()inputtestcount="inline";
  getData(iscompany:boolean)  { 
      if(this.producthidden !="none")
      {
         this.productService.getproduct().subscribe(
           (x)=>
           {
             this.productdata=x.list as Product[];
           }
         );
      }
     this.service.getList(1,Number.MAX_SAFE_INTEGER).subscribe((x)=>
    { 
      this.data = x.list as TestProject[] ; 
      if(iscompany)
      {
       var selcompany= document.getElementById("selcompany");
       var index=this.tablecolumns.findIndex((x)=>x.id==='projectsort');
       var flag=false;
       if(index !=-1)
       {
          this.tablecolumns.splice(index,1);
          flag=true;
       }
       index=this.tablecolumns.findIndex((x)=>x.id==='methodname');
       if(index !=-1)
       {
       this.tablecolumns.splice(index,1);
       flag=true;
       }
       index=this.tablecolumns.findIndex((x)=>x.id==='limitcomment');

       if(index !=-1)
       {
       this.tablecolumns.splice(index,1);
       flag=true;
        }
       index=this.tablecolumns.findIndex((x)=>x.id==='price'); 
       if(index !=-1)
       {
       this.tablecolumns.splice(index,1);
       flag=true;
        }
        if(flag)
       this.tablecolumns=[...this.tablecolumns];
       
       this.cdr.detectChanges();
      
       if(selcompany !=undefined)
       {
        selcompany.style.display="inline";
        this.comanyservice.getList(1,20,{}).subscribe(
          (x)=>{
            this.companydata=x.list as QualificationCompany[]; 
            this.company=Number(this.companydata[0].id);
          });
        }
    }
    else
    {
      this.gettableallData(this.data[0].id);
    }
    }
    );
    
  }
   
  @Input() displayselquli="inline";
 gettableallData(id:string) { 
  this.tableindex=1;
  this.tablequery={filter:[{field:'id',value:id,operation:"="},{field:'companyid',value:this.company+'',operation:"="}]};
  this.qualservice.getList(this.tableindex,this.tablesize,this.tablequery).subscribe((x)=>{
    this.tablealldata=x.list as Qualification[]; 
    this.tablequery={}; 
    this.gettableData();  
  });
  }
  SaveQualification(e:any)
  {
      if(this.type=="add")
      { 
       if(this.selquali !=null)
       this.selquali.push(e); 
       this.tabledata.push(e);
       this.tableindex=1;
        this.gettableallData(e.secondid);
      }
      else if(this.type=="edit")
      { 
        var qu= this.tablealldata.findIndex((x)=>x.id==e.id);
          if(qu !=-1)
          {
            this.tablealldata[qu]=ProjectUtil.deepClone(e);
          }
          qu= this.tabledata.findIndex((x)=>x.id==e.id);
          if(qu !=-1)
          {
            this.tabledata[qu]=ProjectUtil.deepClone(e);
          }
          this.tabledata=[...this.tabledata];
      }
       this.addvisible=false;
  }
  tablerowchange(item:any)
  {
    var iitem=this.selquali.findIndex((x)=>x.testprojectid==item.testprojectid&&x.methodid==item.methodid);
      
    if(iitem==-1&&item.checkbox)
      {
        this.selquali.push(ProjectUtil.cloneobject(item));
      } 
      else if(!item.checkbox&&iitem>=0)
      {
         this.selquali.splice(iitem,1);
      }
      this.selquali=[...this.selquali];
  }
  gettableData()
  {
    if(this.selquali.length>0)
    {
      this.Qualifis.getqualifications(this.selquali).subscribe(
        (x)=>
        {
         var  sels=x as Qualification[];
          sels.map(
            (y)=>
            {
              var index=this.selquali.findIndex((z)=>z.id==y.id);
              if( index!=-1)
              {
                  var tecount=this.selquali[index].testcount; 
                  this.selquali[index]= ProjectUtil.cloneobject(y);
                  this.selquali[index].testcount=tecount;  
              }
            }
          );
          this.selquali=[...this.selquali];
        }
      );
    }
      
    this.qualservice.gethandledata(this.tablealldata,this.tableindex,this.tablesize,this.tablequery)
         .subscribe(
            (x)=>
            { 
               this.tabletotal =Number(x.total); 
              this.tabledata=[...x.list as any[]]; 
               if(x.list !=undefined)
              {
              x.list.map((y)=>{
                var index=this.selquali.findIndex((z)=>z.id==y.id);
              if( index!=-1)
              {
                y.checkbox=true; 
              }
              else
              {
                y.checkbox=false;
              }
              }) ; 
            } 
           }
         )
  }
  indexChange(index: number) {
    this.tablequery={};
    this.tableindex = index; 
    this.gettableData();
    this.checkedAll=false;
  }
  
  sortChange(sort: XSort[]) {
    this.tablequery={};
    this.tablequery.sort = sort;
    this.gettableData();

  }
  companydata:QualificationCompany[]=[];
  company=1;
  oldcompany=1;

}
