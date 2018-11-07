'use strict';
const egg = require('egg');
const Controller = egg.Controller;
class TestCtrl extends Controller {
	async index(){
		let ctx = this.ctx
		ctx.body='wellcome egg service'
	}
}
module.exports = TestCtrl