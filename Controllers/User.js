const UserModel=require('../Model/User');
const bcrypt=require('bcrypt');
exports.PostUserDetails=async(req,res,next)=>{
    try{
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;
        const fullName=firstName+" "+lastName;
        const email=req.body.email;
        const pass=req.body.password;
        const user=await UserModel.findOne({Email:email});
        if(user){
            return res.status(200).json({"message":"User Already Exits"})
        }
        const saltRound=10;
        bcrypt.hash(pass,saltRound,async(err,hash)=>{
            if(err){
                console.log(err);
            }
            const PostSignUpData=new UserModel({
                Name:fullName,
                Email:email,
                Password:hash
            })
            await PostSignUpData.save();
            return res.status(200).json({signUpData:PostSignUpData});
        })
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}

exports.Login=async(req,res,next)=>{
    try{
        const email=req.body.email;
        const pass=req.body.password;
        const user=await UserModel.findOne({Email:email});
        if(!user){
            return res.status(200).json({"message":"Invalid Credentials"});
        }
        const password=user.Password;
        const isPasswordValid=await bcrypt.compare(pass,password);
        if(!isPasswordValid){
            return res.status(200).json({"message":"Invalid Credentials"});
        }
        return res.status(200).json({ message: 'Login successful',user});
    }catch(err){
        return res.status(400).json({error:err.message});
    }
}
exports.UpdatePassword=async(req,res,next)=>{
    try{
        const email=req.body.email;
        const pass=req.body.password;
        const user=await UserModel.findOne({Email:email});
        if (!user) {
            return res.status(404).json({ "message": "User not exists" });
        }
        const saltRound=10;
        bcrypt.hash(pass,saltRound,async(err,hash)=>{
            if(err){
                console.log(err);
            }
            user.Password = hash;
            await user.save();
            return res.status(200).json({ "message": "Password updated successfully" });
        })

    }catch(err){
        return res.status(400).json({err});
    }
}