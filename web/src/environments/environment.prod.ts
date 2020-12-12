export const environment = {
  production: true,
  wsconfig:{host: 'http://127.0.0.1:8001/stompwebsocket',// 监听的地址
  queue: {'init': false}
  ,heartbeatIn:5000
  ,heartbeatOut:5000
  },
  // 框架页
  layout: 'index',
  // 默认的首页
  defaultPage: 'waittask',
  // Api请求地址
  apis:[
    {
      api: 'http://127.0.0.1:3000/',
      servicetype:'userprivilage'
    },
    {
      api: 'http://127.0.0.1:3001/',
      servicetype:'businessprocess'
    },
    {
      api: 'http://127.0.0.1:9001/',
      servicetype:'flowprocess'
    },
]
};
