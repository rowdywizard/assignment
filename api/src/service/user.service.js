const jwt = require('jsonwebtoken');

//load model
let user_model = require('./../Models/user.model');
let auth_model = require('./../Models/auth.model');

exports.list = (request, response) => {
	let params  = request;
    let condition = {};
    
    if(params.id){
        condition['_id']  =	params.id;
    }
    
    if(params.username){
        condition['username']  =	params.username;
    }
	
    return new Promise((resolve, reject) => {
        user_model.find(condition, (err, users) => {
			console.log(users);
			console.log(err);
            if (err) {
                response = global.response_object('0', global.error_message[1]);
                reject(response);
            } else if (!users && users.length == 0){
                response = global.response_object('0', 'Record not found');
                reject(response);
            } else {
                let res = {};
                res['user'] = users;
                response = global.response_object('1', global.error_message[0], res);
                resolve(response);
            }
        });
    });
};

exports.add = (request, response) => {
    let params  = request;
	//let hash = global.bcrypt.hashSync('myPassword', 10);
	//console.log(hash);password

	const user = new user_model({
					first_name	: params.first_name,
					last_name	: params.last_name,
					phone		: params.phone,
					username	: params.phone,
					password	: global.bcrypt.hashSync(params.password, 10),
					gender		: params.gender,
					height		: params.height,
					weight		: params.weight,
					dob			: params.dob
				});
	
    return new Promise((resolve, reject) => {
		user_model.create(user, function(error, createdUser) {
            if (error) {
				response = global.response_object('0', global.error_message[1]);
				reject(response);
            } else {
                response = global.response_object('1', global.error_message[0], createdUser);
				resolve(response);
            }
		});
	});
	
};

exports.update = (request, response) => {
	let params 			= request;//console.log(params.body);console.log(params.params); //request.body //request.params
	let condition 		= {};
	condition['_id']  	= params.id;

	const user = new user_model({
					_id			: params.params.id,
					first_name	: params.body.first_name,
					last_name	: params.body.last_name,
					phone		: params.phone,
					username	: params.phone,
					gender		: params.body.gender,
					height		: params.body.height,
					weight		: params.body.weight,
					dob			: params.body.dob
				});
	
	return new Promise((resolve, reject) => {
		user_model.updateOne( { _id: params.params.id }, user).then( (updatedUser, err) => {			
			if (err) {
				response = global.response_object('0', global.error_message[1]);
				reject(response);
			} else {
				response = global.response_object('1', global.error_message[0], user);
				resolve(response);
			}
		});
	});
}

exports.delete = (request, response) => {
	let params 			= request;
	let condition 		= {};
	condition['_id']  	=	params.id;
	console.log(condition);
	return new Promise((resolve, reject) => {
		user_model.deleteOne(condition, { overwrite: true }, (err, details) => {
			if (err) {
				response = global.response_object('0',error_message[1]);
				reject(response);
			} else {
				response = global.response_object('1',global.error_message[0]);
				resolve(response);
			}
		});
	});
}

exports.login = (request, response) => {
	let params  = request;
    let condition = {};
    
    condition['username']  =	params.username;

    return new Promise((resolve, reject) => {
        user_model.findOne(condition, (err, user) => {
            if (err) {
                response = global.response_object('0', global.error_message[1]);
                reject(response);
            } else if (user.length == 0){
                response = global.response_object('0', 'User dosent exist');
                reject(response);
            } else {
				let res = {};
				let hash = user.password;

				if(global.bcrypt.compareSync(params.password, hash)) {
					// Passwords match
					let authToken 		= createJWT(user._id);
					res['user'] 		= user;
					res['authToken'] 	= authToken;
					response = global.response_object('1', global.error_message[0], res);
					resolve(response);
				} else {
					// Passwords don't match
					response = global.response_object('0', 'Password mismatched');
					reject(response);
				}

            }
        });
    });
}

function createJWT(userId){
	
	let secretKey = process.env.SECRET;
	var token = jwt.sign({ foo: userId }, secretKey, { expiresIn: '60' } );

	const auth = new auth_model({
					token	: token,
					userId	: userId
				});
	
	auth_model.create(auth).then( (createdUser, err) => {
		if (err) {
			response = global.response_object('0', global.error_message[1]);
			reject(response);
		}
	});
	
	return token;
}