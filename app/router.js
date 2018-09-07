'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {

  const { router, controller } = app;

  const setToken = app.middleware.setToken();

  router.get('/', controller.home.index);

  // 上传文章
  router.post('/api/upload/article', controller.upload.article);

  // 上传攻略
  router.post('/api/upload/gonglue', controller.uploadGonglue.index);

  // 上传图片
  router.post('/api/upload/image', controller.upload.image);

  // 登录
  router.post('/api/login', controller.login.index);

  // 获取首页热门文章列表
  router.post('/api/goodList', controller.article.list);

  // 获取文章详情
  router.post('/api/article', controller.article.detail);

  // 获取资讯
  router.post('/api/community', setToken, controller.goodlist.community);

  // 获取资讯详情
  router.post('/api/communityDetail', setToken, controller.goodlist.getDetail);

  // 赞
  router.post('/api/addZan', setToken, controller.goodlist.addZan);
  
  // 获取奇遇列表
  router.post('/api/getqiyulist', setToken, controller.qiyu.index);

  // 获取奇遇列表
  router.post('/api/getQiyuDetail', setToken, controller.qiyu.detail);

  // 获取攻略列表
  router.post('/api/getGonglue', setToken, controller.gonglue.index);

  // 获取攻略详情
  router.post('/api/getGonglueDetail', setToken, controller.gonglue.detail);

  // 新闻资讯
  router.post('/api/news', setToken, controller.news.list);

  // 新闻资讯详情
  router.post('/api/newsDetail', setToken, controller.news.detail);
  
  //后台管理路由
  router.post('/api/mannage/admin',setToken,controller.mannage.admin)
  //
  //上传SM.MS图片资料
  router.post('/api/mannage/uploadImg', setToken, controller.mannage.images);

  //上传攻略文章
  router.post('/api/mannage/addGonglue',setToken,controller.mannage.addGonglue);

  //上传奇遇攻略
  router.post('/api/mannage/addQiyu',setToken,controller.mannage.addQiyu);

   //上传八卦客栈
  router.post('/api/mannage/addInformation',setToken,controller.mannage.addInformation);

 //上传八卦客栈
  router.post('/api/mannage/addYjqyComm',controller.mannage.addYjqyComm);

  //新闻添加
  router.post('/api/mannage/addNews',setToken,controller.mannage.addNews);


  //御剑情缘

  //获取精选图片
  router.post('/api/yjqy/getpics',controller.yjqy.getpics);

  //获取咖啡屋列表
  router.post('/api/yjqy/coffeeHouse',controller.yjqy.coffeeHouse);

  //获取咖啡屋事件
  router.post('/api/yjqy/coffeeThing',controller.yjqy.coffeeThing);
};
