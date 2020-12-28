import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { QualificaitonService, TestProject, TestProjectService } from '../qualification.service';

@Component({
  selector: 'app-addqualificaiton',
  templateUrl: './addqualificaiton.component.html',
  styleUrls: ['./addqualificaiton.component.scss']
})
export class AddqualificaitonComponent implements OnInit,DoCheck {

  constructor(private service:TestProjectService,private qualificationservice:QualificaitonService) { }
  ngDoCheck(): void {
     if(this.firstsel!=undefined&&this.firstsel!=this.oldfirstsel)
     {
      this.getsceconddata();
     }
  }

  ngOnInit(): void {
    this.getfirsdata();
  }
  getfirsdata()
  {
    this.service.getprojectsbylevel(1).subscribe(
      (x)=>
      {
        this.firstseldata=x as TestProject[];
        if(this.firstseldata!=undefined&&this.firstseldata!=null&&this.firstseldata.length>0)
        {
          this.firstsel=this.firstseldata[0].id;
          
        }
      }
    );
  }
  getsceconddata()
  {
    this.service.getprojectsbypid(this.firstsel+'').subscribe(
      (y)=>
      {
         
        this.categorydata=y as TestProject[];
        
        if(this.categorydata!=undefined&&this.categorydata!=null&&this.categorydata.length>0)
        {
          this.categorysel=this.categorydata[0].id;
          this.oldfirstsel=this.firstsel;
         
        }
      }
    );
  }
  get disabled()
   {
     if(this.projectname==null||this.projectname=="")
     {
       return true;
     }
     if(this.standardname==null||this.standardname=="")
     {
       return true;
     }
     if(isNaN(this.price))
     {
       return true;
     }
     return false;
   }

  projectname="";
  @Output() SaveQualification=new EventEmitter<any>();
  companyid=1;
  savedata()
  {
            if(this.type=="add")
            {
            this.qualificationservice.addqualification(
              { 
                qualifiedid:this.firstsel, 
                parentprojectid:this.categorysel,
                TestProject:this.projectname,
                testprojectid:null,
                standardid:null,
                methodname:this.methodname,
                standardname:this.standardname,
                methodid:null,
                price:this.price,
                companyid:this.companyid
              }
            ).subscribe((x)=>{
              if(this.SaveQualification!=undefined)
              {
                  this.SaveQualification.emit(x);
              }
            }
            );
          }
          else if(this.type=="edit")
          {
            this.qualificationservice.updatequalification(
              { 
                qualifiedid:this.firstsel, 
                parentprojectid:this.categorysel,
                qualificationid:this.currentquali.id+'',
                standardid:this.currentquali.standardid+'',
                TestProject:this.projectname,
                testprojectid:this.currentquali.testprojectid+'',
                methodname:this.methodname,
                methodid:this.currentquali.methodid+'',
                price:this.price,
                companyid:this.companyid,
                standardname:this.standardname
              }
            ).subscribe((x)=>{
              if(this.SaveQualification!=undefined)
              {
                  this.SaveQualification.emit(x);
              }
            }
            );
          }
  }
  currentquali:any={};
  type="info";
  setqualificaiotndata(tpe:string,selquali?:any)
  {
    this.type=tpe;
     if(selquali !=undefined)
     { 
      this.currentquali=selquali;
       this.firstsel=selquali.firstid+'';
       this.categorysel=selquali.secondid+''; 
       
       this.projectname=selquali.testproject;
       this.price=selquali.price;
       this.methodname=selquali.methodname;
       this.standardname=selquali.standardname;
     }
  }
  firstseldata:TestProject[]=[]; 
  firstsel:string="0";
  oldfirstsel:string="0";
  price=0;
  categorydata:TestProject[]=[];
    categorysel:string="0";
  methodname=""; 
  standardname="";
}
