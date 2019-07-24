//load model
//const user_model = require('./../models/user.model');
const user_service = require('./../service/user.service');
const { check, validationResult } = require('express-validator');

exports.list = (request, response) => {
	let params  = request.params;
	user_service.list(params).then((result) => {
		response.send(result);
	}).catch(function(error) {
		 response.send(error);
	});
};

exports.add = async (request, response, next) => {
	errors = validationResult(request);
	let params  = request.body;
	
	if (!errors.isEmpty()) {
		let responseMsg = errors.array({ onlyFirstError: true });
		let responseObj = global.response_object('0', global.get_error_message(responseMsg));
		return response.send(responseObj);
	}
	
	let condition = {}
	condition['username'] = params.phone;

	user_service.list(condition).then((result) => {
		if(result.response_data.user.length == 0){
			user_service.add(params).then((result) => {
				response.send(result);
			}).catch(function(error) {
				response.send(error);
			});
		} else {
			let responseMsg = "Username already exists!";
			let responseObj = global.response_object('0', responseMsg);
			response.send(responseObj);
		}
	})

};

exports.update = async (request, response, next) => {
	let params  = request; //request.body //request.params
	
	errors = validationResult(request);

	if (!errors.isEmpty()) {
		let responseMsg = errors.array({ onlyFirstError: true });
		let responseObj = global.response_object('0', global.get_error_message(responseMsg));
		return response.send(responseObj);
	}
	
	user_service.update(params).then((result) => {
		response.send(result);
	}).catch(function(error) {
		 response.send(error);
	});
};

exports.delete = async (request, response, next) => {
	let params  = request.params;
	user_service.delete(params).then((result) => {
		response.send(result);
	}).catch(function(error) {
		 response.send(error);
	});
}

exports.validate = (method) => {
	switch (method) {
	  	case 'createUser': {
			return [ 
				check('first_name', 'First Name required!').exists(),
				check('last_name', 'Last Name required!').exists(),
				check('phone', 'Phone No required!', 'Phone No not valid').isInt(),
				check('phone', 'Phone No required!', 'Phone No not valid')
						.isInt().withMessage('Must be a integer')
						.isLength({min:8}).withMessage('Minimum 8 Digits'),
				check('password', 'Password required!')
						.isLength({min:6}).withMessage('Password must be greater than 6 characters')
						.isLength({max:15}).withMessage('Password must be less than 15 characters')
						.isAlphanumeric().withMessage('Must be alpha numeric'),
				check('gender', 'Gender required!')
						.isIn(['M', 'F', 'O']).withMessage('Must be in [M, F, O]]'),
				check('height').optional()
						.isInt().withMessage('Must be an integer'),
				check('weight', 'Weight required!')
						.isInt().withMessage('Must be an integer'),
				check('dob', 'Date of Birth required')
						.isISO8601().withMessage('must be a valid date'),
				check('otp', 'OTP required!'),
			]   
		}
		break;  
		  
		case 'updateUser': {
			return [ 
				//check('id', 'ID required!').exists(),
				check('first_name', 'First Name required!').exists(),
				check('last_name', 'Last Name required!').exists(),
				check('phone', 'Phone No required!', 'Phone No not valid').isInt(),
				check('phone', 'Phone No required!', 'Phone No not valid')
						.isInt().withMessage('Must be a integer')
						.isLength({min:8}).withMessage('Minimum 8 Digits'),
				check('gender', 'Gender required!')
						.isIn(['M', 'F', 'O']).withMessage('Must be in [M, F, O]]'),
				check('height').optional()
						.isInt().withMessage('Must be an integer'),
				check('weight', 'Weight required!')
						.isInt().withMessage('Must be an integer'),
				check('dob', 'Date of Birth required')
						.isISO8601().withMessage('must be a valid date'),
				check('otp', 'OTP required!'),
			]   
	  	}
		break;

		case 'loginUser':{
			return [
				check('username', 'Username required!').exists(),
				check('password', 'Password required!').exists(),
			]
		}
		break;
	}
}