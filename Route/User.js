const express=require('express');
const router=express.Router();
const UserControllers=require('../Controllers/User');
router.post('/user_details',UserControllers.PostUserDetails);
router.post('/login_details',UserControllers.Login);
router.put('/update_password',UserControllers.UpdatePassword);
module.exports=router;