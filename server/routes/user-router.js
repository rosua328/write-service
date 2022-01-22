const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

router.post("/join", async(req,res)=>{
    try{
        const obj={
            email: req.body.email,
            name: req.body.name,
            password : req.body.password
        };
        const user = new User(obj);
        await user.save();
        res.json({message:"회원가입 완료"});
    } catch(err){
        res.json({message:false});
    }
})

router.post("/login", async(req,res)=>{
    try{
        const obj={
            email: req.body.email,
            password: req.body.password
        };
        const user = await User.find(obj);
        if(user[0]){
            res.json({message:"로그인 되었습니다.", _id: user[0]._id});
        }
        else{
            res.json({message: false})
        }
    } catch(err){
        console.log(err);
        res.json({message: false});
    }
})