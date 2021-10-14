const express= require('express')
const router = express()

const noteDetail = require('../model/noteDetails')

// response to show and check
router.get('/',(req,res)=>{
    // res.send("Hello sujan")
   
    noteDetail.find({
    }).then((data)=>{
        // console.log('Data :',data)
        res.json(data)
    }).catch((error)=>{
        console.log("error :",error)
    })

})

router.post('/add',(req,res)=>{

    const newNoteDetails = new noteDetail(req.body) // instances of model

    newNoteDetails.save((error)=>{
            if(error){
                res.status(500).json({msg:"sorry Internal error occured"})
                console.log("oops an error ocured")
                return ;
                }

            return res.json({
                        msg:"Sucessfully Posted !!!"
                    })          
                     
                })
                
                         
            })

router.delete('/delete/:id',async(req,res)=>{
    const id= req.params.id
    try {
        await noteDetail.findByIdAndRemove(id).exec()
        res.send({msg:"user removed Successfully"})
        
    } catch (error) {
        res.send({msg:"user not deleted"})
        
    }


  
})
            

module.exports = router



// const newNoteDetails = new noteDetail(data) // instances of model

// newNoteDetails.save((error)=>{
//         if(error){
//                 consolr.log("oops an error ocured")
//             }else{
//                     console.log("Data has been saved")
//                 }
//             })
            