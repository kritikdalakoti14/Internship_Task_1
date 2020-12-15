const mongoose = require("mongoose")
const validator =require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		trim:true
	},
	password:{
		type:String,
		required:true,
		unique:true,
		trim:true,
		validate(value){
			if(value.length<6){
				throw new Error()
			}
		}
	},
	email:{
		type:String,
		required:true,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email not valid')
			}
		}
	},
	phoneno:{
		type:String,
		required:true,
		validate(value){
			if(!value.length==10){
				throw new Error('phn no not valid!!')
			}
		}
	},
	location:{    // storing location of the user or buyer or seller
		type:{
			type:String,
			enum:['Point']
		},
		coordinates:{
			type:[Number]
		}
	},
	products:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Userproduct"
	},
	isAdmin:Boolean
});

userSchema.pre('save',async function(next){
	const user=this
	if(user.isModified('password')){
		user.password=await bcrypt.hash(user.password,8)
	}
	next()
})

module.exports = mongoose.model("User",userSchema);