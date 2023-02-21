const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {encrypt, decrypt, compare} = require('n-krypta')
const myFunctions = require('../others/functions')

const dataSchema = require('../models/fileData')
const pathSchema = require('../models/path')

router.get('/',(req,res)=>{
    res.send("data")
})

router.post('/getSpecific', async (req,res)=>{
    const pathName = req.body.pathName;
    const token = req.body.token;
    const isValid = await myFunctions.isValidToken(pathName,token);

    if (isValid){
        dataSchema.findOne({pathName:pathName},(err,doc)=>{
            console.log(doc);
            if(doc){
                return res.status(200).send(doc)
            }
            else{
                return res.status(404).send("path name not found")
            }
        })
    }
    else{
        res.status(404).send("invalid token");
    }
})


router.post('/new',async (req,res)=>{
    console.log('/new')
    const pathName = req.body.pathName;
    const token = req.body.token;
    const isValid = await myFunctions.isValidToken(pathName,token);
    const defaultData = [{name:'File - 1',text:"<h3>start Writing...</h3>"}];
    if (isValid){
        pathSchema.find({pathName:pathName},(err,docs)=>{
            if(docs.length !== 0){
                const newDataPath = new  dataSchema({
                    pathName:pathName,
                    files: encrypt(defaultData,process.env.ENCR_SECRET)
                })
                newDataPath.save()
                return res.status(200).send("files added successfully");
            }
            else{
                return res.status(404).send("path name not found")
            }
        })
    }
    else{
        res.status(404).send("invalid token");
    }
})

router.put("/updateFiles",async (req,res)=>{
    console.log("/updateFiles")
    const pathName = req.body.pathName;
    const token = req.body.token;
    const files = req.body.files;
    console.log(req.body,files);
    const isValid = await myFunctions.isValidToken(pathName,token);
    if (isValid){
        dataSchema.updateOne({pathName:pathName},{files:files},(err,doc)=>{
            console.log("response, ",doc);
            if(doc.acknowledged){
                res.status(200).send(true);
            }
            else{
                return res.status(404).send("path name not found")
            }
        })
    }
    else{
        res.status(404).send("invalid token");
    }

})

module.exports = router;