// var mongoose_delete = require('mongoose-delete');
// const USER_ROOT_IMAGE_PATH = 'https://s3.amazonaws.com/';
//, index: { unique: true, dropDups: true }

var uniqueValidator = require('mongoose-unique-validator');

// schema of users
const users_schema = new global.Schema(
{
	ip_address				: { type: String, trim: true },
    username				: { type: String, lowercase: true, trim: true, unique: true, dropDups: true },
	password				: { type: String, trim: true },
	salt					: { type: String, trim: true },
    email					: { type: String, trim: true },
	activation_code 		: { type: String, trim: true },
    forgotten_password_code	: { type: String, trim: true },
	forgotten_password_time	: { type: Number, default: true },
	remember_code			: { type: String, default: true },
	otp						: { type: Number, default: true },
	otp_initiate_time		: { type: Number, default: true },
	last_login				: { type: Number, default: true },
	active					: { type: Number, default: true },
	first_name				: { type: String, default: '' },
	last_name				: { type: String, default: '' },
	gender					: { type: String, default: 'O' },
	image					: { type: String, default: '' },
	country_code			: { type: String, default: +91 },
	height					: { type: Number, default: 0 },
	weight					: { type: Number, default: 0 },
	dob						: { type: Date },
}, 
{ timestamps: true });

users_schema.plugin(uniqueValidator, {message: 'is already taken.'});

//users_schema.plugin(mongoose_delete);

const Users = global.mongoose.model('users', users_schema);
module.exports = Users;

// schema of users