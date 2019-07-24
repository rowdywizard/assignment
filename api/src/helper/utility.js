/**
 * @desc Response object function
 * @param {string} code - The code of the response.
 * @param {string} msg - The message of the respones.
 * @param {string} data - The data of the response.
 * @returns {object} response object
 */
	global.response_object = function (code, msg, data={}) {
		return {
		"response_code": code,
		"response_message": msg,
		"response_data": data,
		};
	};
	
/**
 * @desc Response boolean function
 * @param {key} code - The code of the response.
 * @returns {boolean} response object
*/
	global.is_key_existed = function (key) {
	  let flag = true;
	  if(key == undefined)
	  {
		 flag=false; 
	  }
	  return flag;
	};

/**
 * @desc Response string function
 * @param {key} array of error - The code of the response.
 * @returns {string} response object
 */
	global.get_error_message = function (error){
		let error_message = global.error_message[1];
		if(Array.isArray(error)){
			error_message = error[0].msg;
		}
		return error_message;
	}
