'use strict';
const egg = require('egg');
const Controller = egg.Controller;

class HomeController extends Controller {
  async index() {
  	const ctx= this.ctx;
  	await ctx.render('/index.html');
  }
}

module.exports = HomeController;
