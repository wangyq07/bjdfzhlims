import { Component, OnInit, HostBinding, ViewEncapsulation, SimpleChanges, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { IndexService } from './index.service';
import { NavService } from './../../services/nav.service';
import { ConfigService } from 'src/services/config.service';
import{HttpService} from 'src/services/http.service'; 
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui';
import { Router } from '@angular/router';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit,OnDestroy,AfterViewInit {
  @HostBinding('class.sider-shrink') get siderShrink() {
    return this.indexService.local.siderShrink;
  }
  
  constructor(private http:HttpService,private indexService: IndexService
            , private nav: NavService
            ,private flowservice:FlowService
            ,private router: Router
            , private config: ConfigService
            ,private msg:XMessageBoxService 
            ) {
    this.nav.init();
     
  }
  
  ngAfterViewInit(): void { 
    this.indexService.connect();
    /**/var interval=setInterval(() => {  
      if(this.indexService.stomp !=undefined&&this.indexService.auth.user.roles!=undefined 
        )
      {
        this.flowservice.getTaskListByRoleId(this.indexService.auth.user.roles).subscribe(
          (x)=>
          {
            if(x!=undefined&&x.list!=undefined&&x.list.length>0)//当前角色有待办任务时发请求
            { 
              this.msg.confirm({
                title: '新任务提示',
                content: '有工作任务需要处理',
                type: 'warning',
                callback: (action: XMessageBoxAction) => {
                  action === 'confirm' &&this.router.navigate(["index/waittask",{refresh:true}]);
            }
            });
            }
        }
        );
          } 
    }
     , 300000); 
      
    
  }
 
  //subscription:Subscription;
  /*subscribesocket(message:IndexService)
  { 
    if(message !=undefined)
    {   
      message.subscription= message.stomp.subscribe(`/${ message.currentuser.roles[0].id}/message`,(data:any)=>
      {

      }
      );
       console.log("订阅成功！", message.currentuser.roles[0].name); 
     } 
      
     
  }*/
   
  ngOnDestroy(): void {
    this.indexService.disconnect();
  }

   clickcount=0;
  contentclick()
  {
    //点击内容页面10次发一次服务请求，修改过期时间，如果一直没点页面，则会在过期时间之后抛出异常
    if(this.clickcount>=10)
    {
    this.http.get('index/beatheart').subscribe();
    this.clickcount=0;
   }
    this.clickcount++;
  }
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}
}
