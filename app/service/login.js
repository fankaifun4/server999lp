const Service = require('egg').Service;
const crypt = require('../lib/WXBizDataCrypt');
const moment = require('moment');

class LoginService extends Service {
  async getData(js_code, encryptedData, iv) {
    const ctx = this.ctx;
    const appid = this.config.appId;
    const secret = this.config.appSecret;
    const wxServer = 'https://api.weixin.qq.com/sns/jscode2session';
	  	const wxRes = await ctx.curl(wxServer, {
	  		method: 'GET',
	  		data: {
	  			appid,
	  			secret,
	  			js_code,
	  			grant_type: 'authorization_code',
	  		},
	  		dataType: 'json',
	  	});


	  	const session_key = wxRes.data.session_key;
	  	const open_id = wxRes.data.openid;

	  	try {

		  	const cryptData = new crypt(appid, session_key);

		  	const userInfo = cryptData.decryptData(encryptedData, iv);

		  	const mysql = this.app.mysql;

		  	const user_info = JSON.stringify(userInfo);

		  	const create_time = userInfo.watermark.timeshamp;

		  	const last_visit_time = (new Date().getTime() / 1000) - 1;

		  	const getId = await mysql.get('user', {
		  		open_id,
		  	});

		  	let insertQuery;

	  		if (getId.open_id) {
        insertQuery = await mysql.update('user', {
			  		uuid: '',
			  		skey: '数据更新',
			  		last_visit_time,
			  		session_key,
			  		user_info,
			  	}, {
			  		where: {
		  				open_id,
			  		},
			  	});
		  	} else {
		  		insertQuery = await mysql.insert('user', {
			  		open_id,
			  		uuid: '',
			  		skey: 'fanfan',
			  		create_time,
			  		last_visit_time,
			  		session_key,
			  		user_info,
			  	});
		  	}
      return wxRes.data;
		  } catch (e) {
		  	return 'error';
		  }


  }

}

module.exports = LoginService;
