const crypto = require('crypto');

class cryptoCtrl {

  cipher(value, pwd) {
    const cipher = crypto.createCipher('aes192', pwd);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return 	encrypted;
  }

  decipher(secret, pwd) {
    const cipher = crypto.createDecipher('aes192', pwd);
    let encrypted = cipher.update(secret, 'hex', 'utf8');
    encrypted += cipher.final('utf8');
    return encrypted;
  }

}

const crypt = new cryptoCtrl();

module.exports = crypt;

