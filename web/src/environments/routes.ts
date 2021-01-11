import { Routes } from '@angular/router';
import { environment } from './environment.prod';
import { AuthGuard } from '../services/auth-guard';

// 公共路由
export const shareRoutes: Routes = [
  // 没有权限的显示模块
  {
    path: 'no-auth',
    loadChildren: () => import('../main/no-auth/no-auth.module').then((x) => x.NoAuthModule),
    data: {
      animation: 'no-auth'
    }
  },
  // 错误的路由或不存在的路由指向的模块
  {
    path: '**',
    loadChildren: () => import('../main/exception/404.module').then((x) => x.Exception404Module),
    data: {
      animation: '404'
    }
  }
];

// 顶级路由，指向框架页
export const mainRoutes: Routes = [
  // 如果路由为空就指向 index
  { path: '', redirectTo: environment.layout, pathMatch: 'full' },
  // 登录页
  {
    path: 'login',
    loadChildren: () => import('../main/login/login.module').then((x) => x.LoginModule)
  },
  // index
  {
    path: 'index',
    loadChildren: () => import('../layout/index/index.module').then((x) => x.IndexModule),
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard]
  },

  ...shareRoutes
];

// 框架页中对应的路由，指向具体的页面，框架页面中的路由都会带上顶级路由 index 如：/index/workplace
export const layoutRoutes: Routes = [
  // 如果路由为空就指向配置的默认首页
  { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },
  // 首页
  {
    path: 'home',
    loadChildren: () => import('../main/home/home.module').then((x) => x.HomeModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'home'
    }
  },
   
  // 用户管理
  {
    path: 'users',
    loadChildren: () => import('../main/system/users/users.module').then((x) => x.UsersModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'users'
    }
  },
  // 角色管理
  {
    path: 'roles',
    loadChildren: () => import('../main/system/roles/roles.module').then((x) => x.RolesModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'roles'
    }
  },
  // 组织管理
  {
    path: 'organization',
    loadChildren: () => import('../main/system/organization/organization.module').then((x) => x.OrganizationModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'organization'
    }
  },
  // 菜单管理
  {
    path: 'menus',
    loadChildren: () => import('../main/system/menus/menus.module').then((x) => x.MenusModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'menus'
    }
  },
  // 待办工作
  {
    path: 'waittask',
    loadChildren: () => import('../main/mytask/waittask/waittask.module').then((x) => x.WaittaskModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'waittask'
    }

  },
  // 已办工作
  {
    path: 'completetask',
    loadChildren: () => import('../main/mytask/completetask/completetask.module').then((x) => x.CompletetaskModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'completetask'
    }

  },
  // 环卫录入
  {
    path: 'evirmenthealth',
    loadChildren: () => import('../main/businessprocess/evirmentheath/evirmentheath.module').then((x) => x.EvirmentheathModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'evirmenthealth'
    }
    
  }, 
  // 合同审核
  {
    path: 'contactaudit',
    loadChildren: () => import('../main/businessprocess/contactaudit/contactaudit.module').then((x) => x.ContactauditModule),
    canLoad: [AuthGuard],
    data: {
      animation: 'contactaudit'
    }
    
  }, 
// 流程注册
{
  path: 'flownode',
  loadChildren: () => import('../main/flow/flownode/flownode.module').then((x) => x.FlownodeModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'flownode'
  }
  
}, 
{
  path: 'registerflow',
  loadChildren: () => import('../main/flow/flowregister/flowregister.module').then((x) => x.FlowregisterModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'registerflow'
  }
  
},
// 角色打折情况
{
  path: 'rolediscount',
  loadChildren: () => import('../main/system/rolediscount/rolediscount.module').then((x) => x.RolediscountModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'rolediscount'
  }
  
},
// 审核角色设定
{
  path: 'roleauditset',
  loadChildren: () => import('../main/system/roleauditset/roleauditset.module').then((x) => x.RoleauditsetModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'roleauditset'
  }
  
},
// 市场总监审核
{
  path: 'marketaudit',
  loadChildren: () => import('../main/businessprocess/marketaudit/marketaudit.module').then((x) => x.MarketauditModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'marketaudit'
  }
  
},
// 技术总监审核
{
  path: 'ctoaudit',
  loadChildren: () => import('../main/businessprocess/ctoaudit/ctoaudit.module').then((x) => x.CtoauditModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'ctoaudit'
  }
  
},
// 样品数据完善
{
  path: 'samplesupplement',
  loadChildren: () => import('../main/collectionreceive/samplesupplement/samplesupplement.module').then((x) => x.SamplesupplementModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'samplesupplement'
  }
  
},
// 任务下发
{
  path: 'taskdispatch',
  loadChildren: () => import('../main/collectionreceive/taskdispatch/taskdispatch.module').then((x) => x.TaskdispatchModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'taskdispatch'
  }
  
},
// 产品录入
{
  path: 'product',
  loadChildren: () => import('../main/businessprocess/inputproduct/inputproduct.module').then((x) => x.InputproductModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'product'
  }
  
},
// 价格录入
{
  path: 'priceproduct',
  loadChildren: () => import('../main/businessprocess/inputpricecaculate/inputpricecaculate.module').then((x) => x.InputpricecaculateModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'priceproduct'
  }
  
},
// 资质录入
{
  path: 'qualification',
  loadChildren: () => import('../main/businessprocess/inputqualification/inputqualification.module').then((x) => x.InputqualificationModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'qualification'
  }
  
},
// 委托协议单生成
{
  path: 'outputlist',
  loadChildren: () => import('../main/businessprocess/outputlist/outputlist.module').then((x) => x.OutputlistModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'outputlist'
  }
  
},
// 资质方法维护
{
  path: 'qualificationmethod',
  loadChildren: () => import('../main/collectionreceive/modifyqualificationmethod/modifyqualificationmethod.module').then((x) => x.ModifyqualificationmethodModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'qualificationmethod'
  }
  
},
// 样品接收
{
  path: 'samplereceive',
  loadChildren: () => import('../main/collectionreceive/samplereceive/samplereceive.module').then((x) => x.SamplereceiveModule),
  canLoad: [AuthGuard],
  data: {
    animation: 'samplereceive'
  }
  
},
  // 示例功能
  // { path: 'examples', loadChildren: 'src/main/examples/example.module#ExampleModule', canLoad: [AuthGuard] },
  // // 工作型首页
  // { path: 'workplace', loadChildren: 'src/main/dashboard/workplace/workplace.module#WorkplaceModule', canLoad: [AuthGuard] },
  // // 数据型首页
  // { path: 'analysis', loadChildren: 'src/main/dashboard/analysis/analysis.module#AnalysisModule' },
  // // 账号管理
  // { path: 'account', loadChildren: 'src/main/system/account/account.module#AccountModule', canLoad: [AuthGuard] },
  // // 角色管理
  // { path: 'role', loadChildren: 'src/main/system/role/role.module#RoleModule', canLoad: [AuthGuard] },
  // // 菜单管理
  // { path: 'menu', loadChildren: 'src/main/system/menu/menu.module#MenuModule', canLoad: [AuthGuard] },
  // // 组织管理
  // { path: 'organization', loadChildren: 'src/main/system/organization/organization.module#OrganizationModule', canLoad: [AuthGuard] },
  // // 模块设计
  // { path: 'module', loadChildren: 'src/main/module/module.module#ModuleModule', canLoad: [AuthGuard] },

  ...shareRoutes
];
