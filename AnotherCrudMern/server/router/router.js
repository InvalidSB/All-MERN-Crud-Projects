const express = require("express")
const { createIndexes } = require("../model/student")
const router = express()

const StudentModel = require('../model/student')


router.get('/read',(req,res)=>{
    StudentModel.find({},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})



router.post('/add',async(req,res)=>{
    const {name,age,phone,address,qlty}=req.body
    const Student = new StudentModel({name:name,age:age,phone:phone,address:address,qlty:qlty})

    try{
        await Student.save()
        res.send("Data saved to database")
    }catch(err){
        res.status(404).json({msg:"SOme error occureds"})
    }
})


router.put('/update',(req,res)=>{
    const id = req.body.id
    const newage= req.body.newage
    const newaddress= req.body.newaddress
    const newphone= req.body.newphone
    console.log(req.body.qlty)
    if (req.body.newqlty==1){
        var newqlty= "topper"

    }else if (req.body.newqlty=="2"){
    var newqlty= "Average"

    }else{
        var newqlty= "Below Average"
    }
    console.log(newqlty)

    try {
        StudentModel.findById(id,(err,newupdatedData)=>{
            newupdatedData.age= newage;
            newupdatedData.address= newaddress;
            newupdatedData.qlty= newqlty;
            newupdatedData.newphone= newphone;
            newupdatedData.save()
        })
        
    } catch (error) {
        
    }
})



router.delete('/delete/:id',async(req,res)=>{
    const id =req.params.id
    try {
        await StudentModel.findByIdAndDelete(id).exec()
        res.status(200).json({msg:"Successfully deleted"})

    } catch (error) {
        console.log(error)
    }
})

module.exports = router