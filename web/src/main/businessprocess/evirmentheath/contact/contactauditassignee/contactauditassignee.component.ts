import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { XTreeNode } from '@ng-nest/ui'; 
import { UsersService } from 'src/main/system/users/users.service';
@Component({
  selector: 'app-contactauditassignee',
  templateUrl: './contactauditassignee.component.html',
  styleUrls: ['./contactauditassignee.component.scss']
})
export class ContactauditassigneeComponent implements OnInit {

  constructor(
   private userService:UsersService
  ) {
    userService.getauditcustomuservice().subscribe(
      (x)=>
      {
        this.users=x.list as any[];
        this.users.map(
          (y)=>
          {
            y.pid=null;
            y.label=y.name; 
          }
        );
      }
    );
   }
  @Output() SelectUser=new EventEmitter<any>();
  ngOnInit(): void {
  }
  currentuser:any;
  action(item:any)
  {
    this.currentuser=item;
  }
  users:XTreeNode[];
  confirm()
  {
    if(this.currentuser !=null)
    {
    if(this.SelectUser !=null)
    {
      this.SelectUser.emit(this.currentuser);
    }
  }
  }
}
