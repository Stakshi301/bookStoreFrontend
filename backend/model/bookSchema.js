const {Schema,model}=require('mongoose');

const bookSchema=new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    link:{type: String, required: true }
})

const bookModel=model('bookModel',bookSchema);

module.exports=bookModel;