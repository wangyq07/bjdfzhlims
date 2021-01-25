import { Component, Input, OnInit } from '@angular/core';
import { SealService } from '../../../businessproject/businessproject.service';

@Component({
  selector: 'app-addexterntestproject',
  templateUrl: './addexterntestproject.component.html',
  styleUrls: ['./addexterntestproject.component.scss']
})
export class AddexterntestprojectComponent implements OnInit {

  constructor(
    private sealService:SealService
  ) {
    this.sealService.getList(1,20).subscribe(
      (x)=>
      {
        this.sealdata=x.list as any[];
        if(this.sealdata.length>0)
        {
          this.seal=this.sealdata[0].id;
        }
      }
    );
   }
  sealdata:any[]=[];
  @Input() seal=1;
  ngOnInit(): void {
  }
  @Input() provider="";
  @Input()  testproject="";
}
