import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { TestProject, TestProjectService } from '../qualification.service';

@Component({
  selector: 'app-addqualificaiton',
  templateUrl: './addqualificaiton.component.html',
  styleUrls: ['./addqualificaiton.component.scss']
})
export class AddqualificaitonComponent implements OnInit,DoCheck {

  constructor(private service:TestProjectService) { }
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
     if(this.methodname==null||this.methodname=="")
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
    this.service.savequalification(
      {
         qualifiedid:this.firstsel,
         parentprojectid:this.categorysel,
         TestProject:this.projectname,
         methodname:this.methodname,
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
  firstseldata:TestProject[]=[]; 
  firstsel=0;
  oldfirstsel=0;
  price=0;
  categorydata:TestProject[]=[];
    categorysel=0;
  methodname=""; 
}
