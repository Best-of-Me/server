const express = require("express");
const router = express.Router();
const speedHelp = require('../models/speedHelp')

router.get('/feelings',(req,res,next)=>{
  res.json(speedHelp.feelings)
})
router.get('/situations',(req,res,next)=>{
  res.json(speedHelp.situations)
})
router.get('/happening',(req,res,next)=>{
  res.json(speedHelp.happening)
})
router.get('/advise',(req,res,next)=>{
  res.json(speedHelp.advise)
})

module.exports = router;
