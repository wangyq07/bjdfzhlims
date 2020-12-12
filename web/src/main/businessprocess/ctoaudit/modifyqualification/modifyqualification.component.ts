import { Component, OnInit, ViewChild } from '@angular/core';
import { XQuery, XSort, XTableColumn, XTableComponent } from '@ng-nest/ui';
import { Qualificaiton, QualificaitonService } from 'src/main/qualification/qualification.service';

@Component({
  selector: 'app-modifyqualification',
  templateUrl: './modifyqualification.component.html',
  styleUrls: ['./modifyqualification.component.scss']
})
export class ModifyqualificationComponent implements OnInit {
 data:Qualificaiton[]=[];
 index=1;
  size=10000;
  total=0;
  query: XQuery = {};
   
  
  columns: XTableColumn[] = [
    { id: 'index', label: '序号',width:80, type: 'index',flex:1 },
    { id: 'projectsort', label: '项目序号',width:80},
    { id: 'testproject', label: '项目',width:150},
    { id: 'methodname', label: '方法', width:500}
  ];
  constructor(private qualservice:QualificaitonService) { }
  @ViewChild("tablecom")tablecom:XTableComponent;
  search(searchkey:any)
  {
     if( searchkey!=undefined)
     { 

        this.qualservice.getqualificationbysearchkey(1,searchkey.name)
        .subscribe(
          (x)=>
          {
            this.data=x as Qualificaiton[];
            console.log(this.data);
            console.log(searchkey.id);
            var findex=this.data.findIndex((d)=>d.id==searchkey.id);
            if(findex!=-1)  
            this.tablecom.activatedRow= this.data[findex];
          }
        );
     }
  }
   limitmax=0;
   limitmin=0;
  ngOnInit(): void {
  }
  current:Qualificaiton;
  activatedRow(item:Qualificaiton)
  {
    this.current=item;
  }
  indexChange(index: number) {
    
  }
  
  sortChange(sort: XSort[]) {
     

  }
}
