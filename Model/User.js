const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
})

module.exports=new mongoose.model('User',UserSchema);