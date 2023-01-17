const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const Announce=require('../model/announcements.js');
const jwt = require('jsonwebtoken');
const Book=require('../model/books.js')
const bcrypt=require('bcryptjs')
const { verifyToken, isadmin } = require('../middlewares/verifyauth');
const cloudinary=require('cloudinary')

//add book
router.post('/addbook',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
     const result=await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"books"
     })
     req.body.public_id=result.public_id;
     req.body.url=result.url;
     req.body.user_id=req._id
    const book=await Book.create(req.body);
     
res.status(201).json({success:true,book})
}))

//delete book
router.post('/delbook',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const book=await Book.findByIdAndDelete(req.body.id)
    await cloudinary.v2.uploader.destroy(book.public_id)

res.status(201).json({success:true,book})
}))
//Add Announcements
router.post('/addannouncement',verifyToken,isadmin,asyncerror(async(req,res,next)=>{

    const result=await cloudinary.v2.uploader.upload(req.body.image)
    req.body.public_id=result.public_id
    req.body.url=result.url
    req.body.user_id=req._id
    req.body.image=undefined
    console.log(req.body)
    const announce=await Announce.create(req.body)

res.status(201).json({success:true,announce})
}))
///

///

//Remove Announcements
router.post('/removeannouncement',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const announce=await Announce.findByIdAndDelete(req.body.id)
    await cloudinary.v2.uploader.destroy(announce.public_id)

res.status(201).json({success:true,announce})
}))


module.exports=router