
// schema of auth
const auth_schema = new global.Schema(
    {
        token       : { type: String, trim: true },
        userId     : { type: String, trim: true },
    }, 
    { timestamps: true }
);
    
const Auth = global.mongoose.model('auth', auth_schema);

module.exports = Auth;