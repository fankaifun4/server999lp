const crypto = require('crypto');

class cryptoCtrl {

	cipher (value,pwd){
		let cipher =  crypto.createCipher('aes192',pwd)
		let data = cipher.update(value, 'utf8', 'hex');
		data  += cipher.final('hex');
		return 	data
	}

	decipher (secret,pwd){
		let decipher  =  crypto.createDecipher('aes192',pwd)
		let data = decipher.update(secret, 'hex', 'utf8');
		data += decipher.final('utf8');
		return data
	}

}

const crypt = new cryptoCtrl


module.exports = crypt


