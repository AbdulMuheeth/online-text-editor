const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const salt = bcrypt.genSaltSync(10);

const pathSchema = require('../models/path')

// router.get("/",(req,res)=>{
//     res.send(false)
// })

router.post('/new',(req,res)=>{

    // const generatePass = async(pass,salt) => {
    //     return await bcrypt.hashSync(pass,salt)
    // }
    // console.log("/new")
    const newPath = new pathSchema({
        pathName:req.body.pathName,
        password: bcrypt.hashSync(req.body.password,salt)
    })
    
    newPath.save().then(()=>{
        // console.log("successful")
        res.status(200).send({"stat":"successful"})
    })
})

router.post('/validateToken',(req,res)=>{
    
    // console.log("/validateToken")
    const token = req.body.token;
    const pathName = req.body.pathName;

    pathSchema.find({pathName:pathName},(req,docs)=>{
        // console.log(docs);
        if(docs.length !== 0 )
        {
            // console.log("inside")
            res.status(200).send(bcrypt.compareSync(JSON.stringify(docs[0])+process.env.SECRET,token))
        }
        else{
            res.status(404).send(false)
        }
    })


})

router.post('/verify',(req,res)=>{
    // console.log("/verify",req.body)
    pathSchema.find({pathName:req.body.pathName},(err,docs)=>{
        if(docs.length !== 0){
            res.send(true)
        }
        else{
            res.send(false)
        }
    })
})

router.post('/generateToken',(req,res)=>{
    // console.log("/generateToken",req.body)
    pathSchema.find({pathName:req.body.pathName},(err,docs)=>{
        if(docs.length !== 0){
            const value = docs[0];
            if(bcrypt.compareSync(req.body.password,value.password))
            {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(JSON.stringify(value)+process.env.SECRET, salt, function(err, hash) {
                        res.status(200).send({"token":hash})
                    });
                });
            }
            else{
                res.status(404).send({'stat':'invalid password'})
            }
        }
        else{
            res.send({"stat":"pathname not found"})
            // res.redirect(307,"/path/new")
            // res.status(200).send({"stat":"Created new Path set successfully"})
        }
        
    })

})

module.exports = router