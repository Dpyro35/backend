const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const Books=require('../model/books.js');
const jwt = require('jsonwebtoken');
const User=require('../model/user.js')
const Announce=require('../model/announcements.js')
const bcrypt=require('bcryptjs')
const { verifyToken } = require('../middlewares/verifyauth');
const Apifeature=require('../utilis/apifeature.js')
const cloudinary=require('cloudinary')

//Register
router.post('/register',asyncerror(async(req,res,next)=>{
const {email,name}=req.body;
const user=await User.findOne({name,email});
let newuser;
const salt=bcrypt.genSaltSync(10)
const password=bcrypt.hashSync(req.body.password,salt)
console.log(user)
if(user===null){
    req.body.password=password
 newuser=await User.create(req.body);
}else{
    return next(new ErrorHandler('User already exist',405))
}
const token= jwt.sign({id:newuser._id},'moiz2194')
res.status(201).json({success:true,token})
}))
//login
router.post('/login',asyncerror(async(req,res,next)=>{
const {email,password}=req.body;
const user=await User.findOne({email});
console.log(user)
if(!user){
    return next(new ErrorHandler("User doesn't exist",404))
}
const result=bcrypt.compareSync(password,user.password)
if(!result){
    return next(new ErrorHandler("Enter valid credentials",405))
}
const token= jwt.sign({id:user._id},'moiz2194')
res.status(201).json({success:true,token})
}))
//All books

router.get('/books',asyncerror(async(req,res,next)=>{

let apiFeature= new Apifeature(Books.find(),req.query)
.Search();

let books = await apiFeature.query;
res.status(200).send({success:true,books})
}))
//
router.get('/book/:id',asyncerror(async(req,res,next)=>{
    const id=req.params.id


let book = await Books.findById(id)
res.status(200).send({success:true,book})
}))
//

router.get('/announcements',asyncerror(async(req,res,next)=>{

let apiFeature= new Apifeature(Announce.find(),req.query)
.Search();

let announce = await apiFeature.query;
res.status(200).send({success:true,announce})
}))

router.get('/me',verifyToken,asyncerror(async(req,res,next)=>{

let me =await User.findById(req._id)
res.status(200).send({success:true,me})
}))

module.exports=router