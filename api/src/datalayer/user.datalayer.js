
//load model
let department_model = require('./../Models/user.model');

exports.get_list = (request,response) => {
	let param  = request.body;
	let condition = {}
	//condition['organization_id']  =	param.organization_id;
	//condition['deleted']	      =	false;
		return new Promise((resolve, reject) => {
			department_model.find(condition, (err,list) => {
				if (err) 
				{
					response=global.response_object('1',global.error_message[1]);
					reject(response);
				} else 
				{
					let res={};
					res['department_list']=list;
					response=global.response_object('0',global.error_message[0],res);
					resolve(response);
				}
			});
		});	
	
};

exports.get_details = (request,response) => {
	let param  = request.body;
	let condition = {}
	condition['organization_id']  =	param.organization_id;
	condition['_id']  =	request.params.id;
	condition['deleted']	      =	false;
		return new Promise((resolve, reject) => {
			department_model.find(condition, (err,details) => {
				if (err) 
				{
					response=global.response_object('1',error_message[1]);
					reject(response);
				} else 
				{
					if(details.length ==0 )
					{
						response=global.response_object('1','Record not found');
						reject(response);	
					}else
					{
						let res=details[0];
						response=global.response_object('0',global.error_message[0],res);
						resolve(response);
					}
					
				}
			});
		});
	
};

exports.add = (request,response) => {
	  let param  = request.body;
	  let add_data={'organization_id' :param.organization_id,'name':param.name};
	  if(global.is_key_existed(param.percent_parts_equal) )
	  {
		add_data['percent_parts_equal']=param.percent_parts_equal;
	  }
	  if(global.is_key_existed(param.percent_club_discount) )
	  {
		add_data['percent_club_discount']=param.percent_club_discount;
	  }
	  if(global.is_key_existed(param.warranty_factor) )
	  {
		add_data['warranty_factor']=param.warranty_factor;
	  }
	  if(global.is_key_existed(param.custom_parts_multiplier) )
	  {
		add_data['custom_parts_multiplier']=param.custom_parts_multiplier;
	  }
  
	return new Promise((resolve, reject) => {
			department_model.create(add_data, (err,details) => {
				if (err) 
				{
					response=global.response_object('1',global.error_message[1]);
					reject(response);
				} else 
				{
					response=global.response_object('0',global.error_message[0],details);
					resolve(response);
				}
			});
		
    });	
	
};

exports.update = (request,response) => {
	let param  = request.body;
	let condition = {}
	condition['organization_id']  =	param.organization_id;
	condition['_id']  			  =	request.params.id;
	condition['deleted']	      =	false;
	
	
	let update_data={'organization_id' :param.organization_id,'name':param.name};
	if(global.is_key_existed(param.percent_parts_equal) )
	{
	update_data['percent_parts_equal']=param.percent_parts_equal;
	}
	if(global.is_key_existed(param.percent_club_discount) )
	{
	update_data['percent_club_discount']=param.percent_club_discount;
	}
	if(global.is_key_existed(param.warranty_factor) )
	{
	update_data['warranty_factor']=param.warranty_factor;
	}
	if(global.is_key_existed(param.custom_parts_multiplier) )
	{
	update_data['custom_parts_multiplier']=param.custom_parts_multiplier;
	}
	return new Promise((resolve, reject) => {
		department_model.updateOne(condition, (err,details) => {
			if (err) 
			{
				response=global.response_object('1',global.error_message[1]);
				reject(response);
			} else 
			{
				response=global.response_object('0',global.error_message[0],details);
				resolve(response);
			}
		});
	});	

};

exports.delete = (request,response) => {
	let param  = request.body;
	let condition = {}
	condition['organization_id']  =	param.organization_id;
	condition['_id']  			  =	request.params.id;

	return new Promise((resolve, reject) => {
		
		department_model.delete(condition,{ overwrite: true }, (err,details) => {
			if (err) 
			{
				response=global.response_object('1',error_message[1]);
				reject(response);
			} else 
			{
				response=global.response_object('0',global.error_message[0]);
				resolve(response);
			}
		});
	});	
	
};