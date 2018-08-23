'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  const setToken = app.middleware.setToken()

  router.get('/',controller.home.index);

  //上传文章
  router.post('/api/upload/article',controller.upload.article);

  //上传图片
  router.post('/api/upload/image',controller.upload.image);

  //登录
  router.post('/api/login',controller.login.index);

  //获取首页热门文章列表
  router.post('/api/goodList',controller.article.list);

  //获取文章详情
  router.post('/api/article',controller.article.detail);

  //获取资讯
  router.post('/api/community',setToken,controller.goodlist.community);

  //获取资讯详情
  router.post('/api/communityDetail',setToken,controller.goodlist.getDetail);

  //赞
  router.post('/api/addZan',setToken,controller.goodlist.addZan);

  //获取签名
  router.post('/api/sign',setToken,controller.sign.index);

  //获取奇遇列表
  router.post('/api/getqiyulist',setToken,controller.qiyu.index);
};
