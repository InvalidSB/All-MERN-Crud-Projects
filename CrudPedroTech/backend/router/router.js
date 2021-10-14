const express = require('express')
const router = express()


const FriendModel = require("../model/friends")




router.get('/read',(req,res)=>{
   
    FriendModel.find({
    }).then((data)=>{
        console.log('Data :',data)
        res.json(data)
    }).catch((error)=>{
        console.log("error :",error)
    })

})



router.post('/add',async(req,res)=>{
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age
    const friend =new FriendModel({name:name,age:age})
    try {
        await friend.save()
        res.send("data saved")
    } catch (error) {
        console.log("some error occured",error)
    }
    res.send("yaha pani")
})

router.put('/update',async(req,res)=>{
    const edname = req.body.edname
    const edage = req.body.edage
    const id = req.body.id
    try {
       await FriendModel.findById(id,(err,updateFrienddata)=>{updateFrienddata.name=edname,updateFrienddata.age=edage,updateFrienddata.save()})
        res.send("data saved")
    } catch (error) {
        console.log("some error occured",error)
    }
})

router.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    // res.send(id)
    try{
        await FriendModel.findByIdAndDelete(id).exec()
            res.send({msg:"Your selected item deleted"})
        
    }catch (err){
        conssole.log(err)
    }
})




module.exports =router

