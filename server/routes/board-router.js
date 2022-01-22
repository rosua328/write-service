const express = require("express");
const router = express.Router();
const List = require("../schemas/list");

router.post("/delete", async(req, res)=>{
    try{
await List.remove({
    _id: req.body._id
});
res.json({message: true});
    } catch(err){
res.json({message : false});
    }
})

router.post("/update", async(req, res)=>{
    try{
await List.updateOne(
    {_id : req.body._id},
    {$set:{
        writer: req.body.writer,
        title: req.body.title,
        content: req.body.content
    }}
    )
    res.json({message : "게시글 수정 완료"})
    }catch(err){
res.json({message : false})
    }
})

router.post("/write", async(req, res)=>{
    try{
const obj={
    writer: req.body._id,
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

router.post("/getList", async(req, res)=>{
    try{
const _id = req.body._id;
const list = await List.find({writer: _id}, null, {sort: {createdAt: -1}});
res.json({list: list});
    }catch(err){
res.json({message:false})
    }
})

router.post("/detail", async(req, res)=>{
    try{
const _id = req.body._id;
const list = await List.find({_id});
res.json({list});
    }catch(err){
res.json({message:false});
    }
})

module.exports = router;