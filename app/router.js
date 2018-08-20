'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.get('/',controller.home.index);
  //上传文章
  router.post('/api/upload/article',controller.upload.article);
  //上传图片
  router.post('/api/upload/image',controller.upload.image);
  //登录
  router.post('/api/login',controller.login.index);
  //获取资讯
  router.post('/api/community',controller.goodlist.community);
  //获取资讯详情
  router.post('/api/getDetail',controller.goodlist.getDetail);
  //图片上传签证
  router.post('/api/sts',controller.sts.index)
};
