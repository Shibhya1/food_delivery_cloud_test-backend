const express = require('express');
const router = express.Router();
const User = require('../models/UserModel.js');
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
const jwtSecret="ewijweiogjioehg";
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return  res.status(400).json({ errors: result.array() });
    }
  
    // res.send({ errors: result.array() });
    const salt = await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        }).then(user => res.json({success:true}));
 
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })], 
    async (req, res) => {
    
        const result = validationResult(req);
    if (!result.isEmpty()) {
      return  res.status(400).json({ errors: result.array() });
    }
  let email=req.body.email;

    try {
        let userData= await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Try logging with correct email"})
        }
        const pwdCompare =await bcrypt.compare(req.body.password,userData.password);
        if(!(pwdCompare)){
            return res.status(400).json({errors:"Try logging with correct password"})
        }
        const data ={
            user:{
                id:userData.id
            }
        }
        const authTOken=jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authTOken}); 

 
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
module.exports = router;