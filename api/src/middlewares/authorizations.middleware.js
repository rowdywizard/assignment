//load model
let auth_model = require('./../Models/auth.model');

exports.validate = (req, res, next) => {

    let condition = {};
    
	condition['token']  =	req.headers.authorization;
    
    auth_model.findOne(condition, (err, auth_detail) => {
        if (err) {
            let response = global.response_object('1','Something Wrong');
            return res.send(response);
        } else {
            if(auth_detail.length == 0 ) {
                let response = global.response_object('1','Invalid Authorization');
                return res.send(response);
            } else {
                let userId = auth_detail.userId;
                global.userId = userId;
                next();
            }
        }
    });
    	
};






