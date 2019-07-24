const user_service = require('./../service/user.service');
const { check, validationResult } = require('express-validator');

exports.login = async (request, response, next) => {
	let params  = request.body;
	user_service.login(params).then((result) => {
		response.send(result);
	}).catch(function(error) {
		 response.send(error);
	});
}

exports.sendOTP = async (request, response, next) => {
	let params  = request.body;
	user_service.login(params).then((result) => {
		response.send(result);
	}).catch(function(error) {
		 response.send(error);
	});
}

exports.validate = (method) => {
	switch (method) {
		case 'loginUser':{
			return [
				check('username', 'Username required!').exists(),
				check('password', 'Password required!').exists(),
			]
		}
		break;
	}
}

function generateOTP(){

}