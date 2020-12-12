import { FormGroup } from '@angular/forms';
import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';  
import {StompService}from 'ng2-stomp-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { XmlParser } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
   
})
export class LoginComponent implements OnInit,OnDestroy {
  // 登录的loding
  loading: boolean = false;

  userForm: FormGroup = this.formBuilder.group({
    account: [''],
    password: ['']
  });

  constructor(public authService: AuthService,
             public router: Router
             , public formBuilder: FormBuilder
             , public message: XMessageService
             ) {
                  
             }
  ngOnDestroy(): void {
     //this.disconnect();
  }
  presskey(e:any)
  {
      if(e.keyCode==13)
      this.login();
  }
  @ViewChild("imag")imag:SVGAElement;
  bindsvg:any;
  send()
  {
     
     this.authService.httpService.http.post("http://localhost:9001/demo/showImg?instanceId=760aae61-2bf7-11eb-b0f7-54ee75054353",{} 
                                                         ).subscribe((x:any)=>{
                                                           
                                                           this.bindsvg=x.output; 
                                                          }); 
                                                        
  }
  ngOnInit() {
    
     
} 
subscription: Subscription;




  // 登录
  login() {
    if (this.loading == false) {
      let user = this.userForm.value;
      if (user.account && user.password) {
        this.loading = true;
        this.authService.login(user).subscribe(
          () => {
            if (this.authService.isLoggedIn) {
              let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : `/${environment.layout}`;
              this.router.navigate([redirect]);
            }
          },
          () => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.message.warning('用户名或密码不能为空！');
      }
    }
  }
}
