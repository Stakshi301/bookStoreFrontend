const mongoose=require('mongoose');
const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{type:String,required:true,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:false},
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    likedBooks: [{ type: Schema.Types.ObjectId, ref: 'bookModel' }]

})

const User = model('User', userSchema);

module.exports=User; 