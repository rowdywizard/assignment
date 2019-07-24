var crypto = require('crypto');
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';
	exports.create_access_token = (key) => {
		//Loading the crypto module in node.js
		
		//creating hash object 
		var hash = crypto.createHash('sha512');
		//creating hash object 
		let current_timestamp=new Date().getTime();
		let random_number=Math.floor(Math.random() * 500000);
		let access_token_string =key+current_timestamp+random_number;
		hash_data = hash.update(access_token_string);
		let access_token=hash_data.digest('hex');
		return access_token;
	};
	

	exports.encrypt=(text) => {
		var cipher = crypto.createCipher(algorithm,password)
		var crypted = cipher.update(text,'utf8','hex')
		crypted += cipher.final('hex');
		return crypted;
	  };
	   
	  exports.decrypt = (text) => {
		var decipher = crypto.createDecipher(algorithm,password)
		var dec = decipher.update(text,'hex','utf8')
		dec += decipher.final('utf8');
		return dec;
	  }
	



