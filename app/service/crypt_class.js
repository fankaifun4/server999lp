const crypto = require('crypto');

class cryptoCtrl {

	cipher (value,pwd){
		let cipher =  crypto.createCipher('aes192',pwd)
		cipher.update(value, 'utf8', 'hex');
		let encrypted  = cipher.final('hex');
		return 	encrypted
	}

	decipher (secret,pwd){
		let cipher =  crypto.createDecipher('aes192',pwd)
		cipher.update(secret, 'hex', 'utf8');
		let encrypted = cipher.final('utf8');
		return encrypted
	}

}

const crypt = new cryptoCtrl

module.exports = crypt


