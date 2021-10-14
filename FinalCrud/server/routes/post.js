const express = require('express')
const router = express()

const postModel =require('../model/Post') 


router.post('/posts/add',(req,res)=>{
    const post = new postModel(req.body) 

    post.save((err)=>{
        if(err) return res.status(400).json({msg:"error on saving proces"})
        return res.status(200).json({success:true})
    })
})


router.get('/posts',async(req,res)=>{
 await postModel.find({}).exec((err,posts)=>{
     if(err)return res.status(400).json({success:false,err})
     return res.status(200).json({success:true,posts:posts})
 })
})

router.get('/posts/details/:id',async(req,res)=>{
    let id = req.params.id
 await postModel.findById(id,(err,post)=>{
     if(err)return res.status(400).json({success:false,err})
     return res.status(200).json({success:true,post})
 })
})





router.put('/posts/update/:id',async(req,res)=>{
    await postModel.findByIdAndUpdate(req.params.id,{$set:req.body},(err,post)=>{
        if(err)return res.status(400).json({success:false,err})
        return res.status(200).json({success:true})
    })
})

router.delete('/posts/delete/:id',async(req,res)=>{
    await postModel.findByIdAndDelete(req.params.id).exec((err,deletedPost)=>{
        if(err)return res.status(400).json({success:false,err})
        return res.json(deletedPost)
    })
})



module.exports =router