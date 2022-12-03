const express = require('express');
const app = express();


const error=(req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404
    next(error);

}
const errorHandler=(error,req, res, next)=>{
    res.status(error.status||500)
    res.json({
        message:error.message
    })
}

module.exports = {error,errorHandler}