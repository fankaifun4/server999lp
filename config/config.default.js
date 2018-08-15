'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533373534733_1477';

  // add your config here
  config.middleware = ['robot'];

  config.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };

  config.baseDir='app/'

  //session 配置
  config.session = {
    key: '999lp_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };


  //csrf防范
  config.security = {
    csrf: false
  };

  config.cors = {
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      origin: '*',
      enable: true,
      credentials: true,
      package: 'egg-cors',
  };

  //cookie
  config.keys = 'fankaifun4';

  config.appId = 'wx9162e60a20921494'
  
  config.appSecret  = 'c6d8fb60d3258e615abeb1071014e94c'

  // 设置redis
  // config.redis = {
  //   enable: true,
  //   package: 'egg-redis',
  // };
  // config.sessionRedis = {
  //   enable: true,
  //   package: 'egg-session-redis',
  // };


  // 添加 view 配置
  // config.view = {
  //   defaultViewEngine: 'nunjucks',
  //   mapping: {
  //     '.tpl': 'nunjucks',
  //   },
  // };

  // config.news={
  //   pageSize:5,
  //   serverUrl:'https://hacker-news.firebaseio.com/v0'
  // }

  config.mysql={
    client: {
      // host
      host: '212.64.19.161',
      // 端口号
      port: '3306',
      // 用户名
      user: 'fkx',
      // 密码
      password: 'xyz2fkk',
      // 数据库名
      database: '999lp',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }


  config.resSuccess={
      code:1,
      msg:'操作成',
  }

  config.resError = {
      code:0,
      msg:'操作失败'
  }

  config.resTimeout = {
      code:401,
      msg:'登录超时'
  }

  return config;
};

