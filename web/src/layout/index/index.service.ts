import { Injectable, Component } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { AuthService} from '../../services/auth.service';
import{ Menu as AuthMenu, Menu} from 'src/main/system/menus/menus.service';
import { NavService } from 'src/services/nav.service';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { FloatNodeComponent } from './sider/float-node/float-node.component';
import { Subject } from 'rxjs';
import {StompService}from 'ng2-stomp-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Inject } from '@angular/core';
import { transformService } from 'src/services/transform.data.service';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui';
import { FlowService } from 'src/main/flow/flowprocess/flowhandle.service';
 
@Injectable({ providedIn: 'root' })
export class IndexService {
  componentRefs: Component[] = [];
   
  // 当前存储关键字
  key: string = 'Index';

  // 面包屑数据
  crumbData: XCrumbNode[] = [];

  // 弹出菜单的节点
  floatNode: Menu;

  // 弹出菜单
  portal: XPortalOverlayRef<FloatNodeComponent>;

  // 当前菜单改变事件
  menuChange = new Subject<{ previous: string; current: string }>();

  // 菜单数据
  public get menus(): Menu[] {
    return this.auth.user.permissions?.menus as Menu[];
  }

  // 本地长期存储
  private _local: Local;

  // 当前会话存储
  private _session: Session;

  constructor(
    public auth: AuthService,
    public settings: SettingService,
    public router: Router,
    public nav: NavService,
    public activtedRouter: ActivatedRoute 
    ,private msg:XMessageBoxService
    ,private flowservice:FlowService
    ,@Inject('stompService') public stomp: StompService
    ,public transglobal:transformService
     
  ) {
    this.listenerRouter();
     //this._user=auth.currentuser;
    stomp.configure(environment.wsconfig);
  }
   
   
    
     
  
   
 private invalidsubscription:Subscription;
  subscription:Subscription;
  connect(): void {
    this.stomp.startConnect().then(() => { 
      this.stomp.done('init'); 
      var str=`/user/${  this.auth.user.roles[0].id}/message`;
      this.invalidsubscription = this.stomp.subscribe(str, // 服务器端返回的数据接收
        (data:any) => this.handlemessage(data)); 
      var userstr= `/user/${  this.auth.user.id}/message`;
      this.subscription=this.stomp.subscribe(userstr, // 服务器端返回的数据接收
        (data:any) => this.handlemessage(data));
       /*this.stomp.send('/app/queue', {// 向服务器端发送请求数据
        rolename: this.auth.user.roles[0].id,
        msg:'连接成功'
      }); */ 
       
         
      //this.getCurrentData(); // 为了设置每隔两分钟向服务器请求数据
    });
  }
  handlemessage(data:any)
  {
     
     this.flowservice.getTaskListByRoleId(this.auth.user.roles,this.auth.user.id+'').subscribe(
       (x)=> 
       {
     if(x.length>0)
     {
     this.msg.confirm({
      title: '新任务提示',
      content: data.msg,
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        action === 'confirm' &&this.router.navigate(["index/waittask",{refresh:true}]);
  }
  });
}
}   
     );
}
  disconnect(): void { // 关闭链接
    this.stomp.send('/app/subscribe', {
      rolename: 'disconnect',
        msg:'关闭链接'
    });
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    if(this.invalidsubscription !=null)
    {
        this.invalidsubscription.unsubscribe();
    }
    this.stomp.disconnect().then(() => {
    });
  } 
   
  get local(): Local {
    if (!this._local) {
      this._local = Object.assign(
        <Local>{
          siderShrink: false,
          defaultPage: environment.defaultPage
        },
        this.settings.getLocal(this.key)
      );
      this.settings.setLocal(this.key, this._local);
    }
    return this._local;
  }

  set local(value: Local) {
    this._local = Object.assign(
      this._local
        ? this._local
        : <Local>{
            siderShrink: false,
            defaultPage: environment.defaultPage
          },
      value
    );
    this.settings.setLocal(this.key, this._local);
  }

  get session(): Session {
    if (!this._session) {
      this._session = Object.assign(
        <Session>{
          activatedPage: environment.defaultPage,
          tabsPage: []
        },
        this.settings.getSession(this.key)
      );
      this.settings.setSession(this.key, this._session);
    }
    return this._session;
  }

  set session(value: Session) {
    this._session = Object.assign(
      this._session
        ? this._session
        : <Session>{
            activatedPage: environment.defaultPage,
            tabsPage: []
          },
      value
    );
    this.settings.setSession(this.key, this._session);
  }

  /**
   * 移除本地长期存储
   *
   * @memberof LayoutService
   */
  removeLocal() {
    this.settings.removeLocal(this.key);
  }

  /**
   * 移除当前会话存储
   *
   * @memberof LayoutService
   */
  removeSession() {
    this.settings.removeSession(this.key);
  }

  /**
   * 二级路由跳转
   *
   * @param {Menu} tab
   * @memberof LayoutService
   */
  push(tab: Menu, activtedRouter: ActivatedRoute) {
    return new Promise((x, y) => {
      if (!tab.router) y('路由页面不存在!');
      this.router
        .navigate([`${tab.router}`], { relativeTo: activtedRouter })
        .then((z) => {
          // this.session = { activatedPage: tab.page };
          // let tabs = _.filter(this.session.tabsPage, x => x.page == tab.page);
          // if (tabs.length === 0) {
          //     this.session.tabsPage.unshift(tab)
          // }
          x(z);
        })
        .catch((z) => {
          y(z);
        });
    });
  }

  /**
   * 路由变化监听
   *
   * @memberof LayoutService
   */
  listenerRouter() {
    this.removeSession();
    this.router.events.pipe(filter((x) => x instanceof NavigationEnd)).subscribe((x: NavigationEnd) => {
      this.setTabs();
      this.setCrumb();
    });
  }

  /**
   * 标签页处理
   *
   * @memberof LayoutService
   */
  setTabs() {
    let url = this.nav.getUrl(this.router.url);
    let routers = url.path.split('/');
    if (routers.length > 2) {
      let router = routers[2];
      let subPage = routers.length > 3 ? _.drop(routers, 3).join('/') : undefined;
      let param = url.param;
      let menu = _.find(this.menus, (x) => x.router == router) as Menu;
      if (menu) {
        let tabsPage = this.session.tabsPage as Menu[];
        let tab = _.find(tabsPage, (x) => x.router == menu.router);
        if (tab) {
          tab.subPage = subPage;
          tab.param = param;
        } else {
          menu.subPage = subPage;
          menu.param = param;
          tabsPage.push(menu);
        }
        const previous = this.session.activatedPage;
        this.session = {
          activatedPage: router,
          subPage: subPage,
          param: param,
          tabsPage: tabsPage
        };
        this.session.tabsPage = [...(this.session.tabsPage as Menu[])];
        this.menuChange.next({ previous: previous as string, current: router });
      }
    }
  }

  /**
   * 面包屑处理
   *
   * @memberof LayoutService
   */
  setCrumb() {
    let menu = _.find(this.menus, (x) => x.router === this.session.activatedPage);
    let crumbs: XCrumbNode[] = [];
    let addParent = (item: Menu) => {
      if (item.pid === null && item.pid === '') return;
      let parent = _.find(this.menus, (x) => x.id === item.pid);
      if (parent) {
        crumbs.unshift({
          id: parent.id,
          label: parent.label,
          data: parent
        });
        addParent(parent);
      }
    };
    if (menu) {
      crumbs.push({ id: menu.id, label: menu.label, data: menu });
      addParent(menu);
    }
    this.crumbData = crumbs;
  }

  floatChild(child: Menu[]) {
    return _.map(_.cloneDeep(child), (x) => {
      x.router = x.router != null ? `./${environment.layout}/${x.router}` : x.router;
      return x;
    });
  }
}

/**
 * 本地长期
 *
 * @export
 * @interface Local
 */
export interface Local {
  /** 是否折叠右边菜单 */
  siderShrink?: boolean;
  /** 默认首页 */
  defaultPage?: string;
}

/**
 * 当前会话
 *
 * @export
 * @interface Session
 */
export interface Session {
  // 当前激活的页面
  activatedPage?: string;
  // 当前激活页面的子页面
  subPage?: string;
  // 当前激活页面的参数
  param?: { [property: string]: any };
  // 标签页数据
  tabsPage?: Menu[];
}

 
