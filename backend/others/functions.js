
const pathSchema = require('../models/path');
const bcrypt = require('bcrypt')

const isValidToken = async(pathName,token) => {
    
    // console.log("isValidToken");
    const docs = await pathSchema.findOne({pathName:pathName})

    // console.log(docs);
    if(docs){
        const value = bcrypt.compareSync(JSON.stringify(docs)+process.env.SECRET,token);
        return value;
    }
    else{
        return false;
    }
    // return false;

    
}

module.exports = {
    isValidToken
}