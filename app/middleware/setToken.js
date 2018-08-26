// app/middleware/report.js
const crypt = require('../service/crypt_class');
module.exports = (options, app) => {
  return async function(ctx, next) {
    const token = ctx.request.headers.token;
    if (token) {
      const keys = 'fankaifun4';
      const openid = crypt.decipher(token, keys).split('.')[0];
      ctx.openid = openid;
      ctx.userId = crypt.decipher(token, keys).split('.')[3];
    } else {
      ctx.openid = '';
      ctx.userId = '';
    }
    await next();
  };
};
