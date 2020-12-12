import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import{transformService} from'src/services/transform.data.service';
import { NavService } from 'src/services/nav.service';
import{GlobalSaveService, testobj} from'src/services/global.storege.service';
@Component({
  selector: 'app-homedetail',
  templateUrl: './homedetail.component.html',
  styleUrls: ['./homedetail.component.scss']
})
export class HomedetailComponent implements OnInit {
  id: string | null;
  type: string | null;
   
  constructor(private router:Router,private activeRouter:ActivatedRoute
       ,private nav:NavService,private globalservice:GlobalSaveService,
       private transerve:transformService
       ) { 
      activeRouter.paramMap.subscribe((x: ParamMap) => {
      this.id = x.get('id');
      this.type = x.get('type');
      }
      );

  }
  action()
  { 
    var dd=new testobj('dddd','wangwang','hhhh');
     //this.transerve.changecustomerservice(dd);
     this.nav.back();
  }
  ngOnInit(): void {
  }
  
}

