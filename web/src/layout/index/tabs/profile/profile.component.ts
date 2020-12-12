import { Component, Input, OnInit, Output,EventEmitter, AfterViewInit } from '@angular/core';
import { XMessageService } from '@ng-nest/ui'; 
import { UsersService } from 'src/main/system/users/users.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,AfterViewInit {
  showbool=false;
  constructor(private Msg:XMessageService,private service:UsersService) { }
  ngAfterViewInit(): void {
     this.password=this.auth.user.password+'';
  }
  @Input() auth:AuthService;
  ngOnInit(): void {
    setTimeout(()=>{this.showbool=true},0); 
  }
  @Output() private profilechange=new EventEmitter<string>(); 
  modifypassword='none';
  password=''; 
  newpas='';
  repeatpas='';
  orignalpass='';
  editconfirm()
  { 
    if(this.orignalpass !=this.auth.user.password)
    {
      this.Msg.error("原始密码不正确");
      return;
    }
    if(this.newpas ==''||this.repeatpas=='')
    {
      this.Msg.error("密码输入是空的");
      return;
    }
    if(this.newpas !=this.repeatpas)
    {
      this.Msg.error("两次输入不一致");
      return;
    }
    this.auth.user.password=this.newpas;
    this.modifypassword="none";
  }
  save()
  { 
    this.service.get(this.auth.user.account+'').subscribe(
      (x)=>
      {
          x.password=this.auth.user.password+'';
          this.service.put(x).subscribe(
            (y)=>
            {
            this.Msg.success('修改成功');
          }
            );
      }
    ) 
    if(this.profilechange !=null)
    {
      this.profilechange.emit('save');
    }
  }
  back()
  {
    if(this.profilechange !=null)
    {
      this.profilechange.emit('back');
    }
  }
}
