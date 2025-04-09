const express=require('express');
const Router=express.Router();
const {signIn,logIn, likeBook,getLiked} =require('../controller/userController');

Router.post('/signin',signIn);
Router.post('/login',logIn);
Router.post('/like', likeBook);
Router.get('/:userId/likes', getLiked);
module.exports=Router;
