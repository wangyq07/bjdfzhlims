import { Component, ViewChild,OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalSaveService } from 'src/services/global.storege.service';

@Component({
  selector: 'app-homeprint',
  templateUrl: './homeprint.component.html',
  styleUrls: ['./homeprint.component.scss']
})
export class HomeprintComponent implements OnInit {
    key:string|null;
  constructor(private router:Router,private activeRouter:ActivatedRoute,private globalservice:GlobalSaveService) {
    
   }
  
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((x: ParamMap) => {
      const key = x.get('key');
      if (key) {
      var obj = this.globalservice.get(key) ;
       var printobj=document.getElementById("printcontent") as HTMLElement;
        printobj.innerHTML=obj;
       //console.log(obj);
      //this.globalservice.setObject(key,null);
      //window.print();
      var newWindow=window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0') as Window;
      newWindow.document.body.innerHTML=document.body.innerHTML;
      //newWindow.document.head.innerHTML=document.head.innerHTML;
      newWindow.print();
   }
  }
   );  
}
}
