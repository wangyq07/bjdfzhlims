import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { XQuery, XSort, XTableColumn, XTableComponent, XTreeComponent } from '@ng-nest/ui';
import { ProjectUtil } from 'src/share/utilclass';
import { AddqualificaitonComponent } from './addqualificaiton/addqualificaiton.component';
import { Qualificaiton, QualificaitonService, QualificaitonServicebyid, QualificationCompany, QualificationCompanyService, TestProject, TestProjectService } from './qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent  implements OnInit {
  @ViewChild('treeCom') treeCom: XTreeComponent;
  @ViewChild('qualtable')qualtable:XTableComponent; 
  searchkey="";
  search()
  {
     if(this.searchkey!="")
     { 

        this.qualservice.getqualificationbysearchkey(this.company,this.searchkey)
        .subscribe(
          (x)=>
          {
            this.tablealldata=x as Qualificaiton[];
            this.tableindex=1;
            this.tablequery={filter:[]}; 
            this.gettableData();
          }
        );
     }
  }
  addvisible=false;
  @ViewChild("addqualificaiton")addqualificaiton:AddqualificaitonComponent;
  add()
  {
    this.addvisible=true;
    if(this.addqualificaiton !=undefined)
    {
      this.addqualificaiton.companyid=this.company;
    }
  }
  handleadd()
  {
    
  }
  delsel(delitem:Qualificaiton)
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
  formGroup = new FormGroup({});
  data:TestProject[]; 
  selquali:Qualificaiton[]=[];
  treeLoading = true;
   type:string;
   selected:TestProject;
   activatedId:string;
  constructor(private service:TestProjectService
    ,private qualservice:QualificaitonService,
    private cdr: ChangeDetectorRef,
    private comanyservice:QualificationCompanyService,
    private  Qualifis:QualificaitonServicebyid
    
    ) {
       
    }
  ngAfterContentInit(): void { 
    this.getData(false);
  }
  @Input() tablespan=12;
  @Input() treespan=12;
  
  tabledata:Qualificaiton[]=[];
  tablealldata:Qualificaiton[]=[];
  tableindex=1;
  tabletotal=0;
  tablesize=20;
  tablequery:XQuery={};
  tablecolumns:XTableColumn[] =[
    {id:'sel',type:"checkbox",label:"选择",width:80}, 
    { id: 'index', label: '序号',width:80, type: 'index',flex:1 },
    { id: 'projectsort', label: '项目序号',width:80},
    { id: 'testproject', label: '项目',width:150},
    { id: 'methodname', label: '方法', width:500},  
    { id: 'limitcomment', label: '限值说明',width:150},
    { id: 'price', label: '价格', width:100}  
  ]
  action( node: TestProject) { 
        this.selected = node; 
        this.tableindex=1;
        this.gettableallData(node.id); 
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
  
  ngAfterViewInit(): void {    
    
  }
  @ViewChild("rrow")rrow:HTMLDivElement;
  ngOnInit() {  
  } 
   
  getData(iscompany:boolean)  { 
    
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
 gettableallData(id:string) { 
  this.tableindex=1;
  this.tablequery={filter:[{field:'id',value:id,operation:"="},{field:'companyid',value:this.company+'',operation:"="}]};
  this.qualservice.getList(this.tableindex,this.tablesize,this.tablequery).subscribe((x)=>{
    this.tablealldata=x.list as Qualificaiton[];
    this.tablequery={}; 
    this.gettableData();  
  });
  }
  SaveQualification(e:any)
  {
       console.log(e);
       if(this.selquali !=null)
       this.selquali.push(e);
       this.addvisible=false;
  }
  tablerowchange(item:any)
  {
    var iitem=this.selquali.findIndex((x)=>x.testprojectid==item.testprojectid&&x.methodid==item.methodid);
      
    if(iitem==-1&&item.sel)
      {
        this.selquali.push(ProjectUtil.cloneobject(item));
      } 
      else if(!item.sel&&iitem>=0)
      {
         this.selquali.splice(iitem,1);
      }
       
  }
  gettableData()
  {
    if(this.selquali.length>0)
    {
      this.Qualifis.getqualifications(this.selquali).subscribe(
        (x)=>
        {
         var  sels=x as Qualificaiton[];
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
        }
      );
    }
      //console.log(this.tablealldata);
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
                y.sel=true; 
              }
              else
              {
                y.sel=false;
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
  }
  
  sortChange(sort: XSort[]) {
    this.tablequery={};
    this.tablequery.sort = sort;
    this.gettableData();

  }
  companydata:QualificationCompany[]=[];//()=>this.comanyservice.getList(1,20).pipe(map((x)=> x.list));
  company=1;
  oldcompany=1;

}
