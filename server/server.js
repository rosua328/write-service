const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session= require("express-session");
const User = require("./schemas/user");
const List = require("./schemas/list")

require("dotenv").config();

mongoose.connect(process.env.DB_NUMBER, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(console.log("db_connect"));


// app.use("/board-data");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        resave: false,
        saveUninitialized:true,
        secret : "suho",
        cookie:{
            httpOnly: true,
            secure : false
        }
    })
)

app.post("/join", async(req,res)=>{
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

app.post("/login", async(req,res)=>{
    try{
        const obj={
            email: req.body.email,
            password: req.body.password
        };
        const user = await User.find(obj);
        if(user[0]){
            res.json({message:"로그인 되었습니다.", _id: user[0]._id, name: user[0].name});
        }
        else{
            res.json({message: false})
        }
    } catch(err){
        console.log(err);
        res.json({message: false});
    }
})

app.post("/getList", async(req, res)=>{
    try{
const _id = req.body._id;
const list = await List.find({}, null, {sort: {createdAt: -1}});
res.json({list: list});
    }catch(err){
res.json({message:false})
    }
})

app.post("/write", async(req, res)=>{
    try{
const obj={
    writer: req.body._id,
    nickname : req.body.nickname,
    title: req.body.title,
    content: req.body.content
};
const list = new List(obj);
await list.save();
res.json({message : "게시글 업로드 성공"});
    }catch(err){
res.json({message:false});
    }
})

app.post("/detail", async(req, res)=>{
    try{
const _id = req.body._id;
const list = await List.findOne({_id});
res.json({list});
    }catch(err){
res.json({message:false});
    }
})

app.post("/updateGet", async(req, res)=>{
    try{
const _id = req.body._id;
const list = await List.findOne({_id});
res.json({list});
    }catch(err){
res.json({message:false});
    }
})

app.post("/delete", async(req, res)=>{
    try{
await List.remove({
    _id: req.body._id
});
res.json({message: true});
    } catch(err){
res.json({message : false});
    }
})

app.post("/update", async(req, res)=>{
    try{
await List.updateOne(
    {_id : req.body._id},
    {$set:{
        // writer: req.body.writer,
        title: req.body.title,
        content: req.body.content
    }}
    )
    res.json({message : "게시글 수정 완료"})
    }catch(err){
res.json({message : false})
    }
})

app.listen(5000, ()=>{
console.log("server listen");
});