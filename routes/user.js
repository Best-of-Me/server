const express = require("express");
const router = express.Router();
const User = require('../models/User')

router.post("/", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.post("/:id", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.put("/:id", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.delete("/:id", (req, res, next) => {
  res.status(404).end('/user not-found')
});

router.get('/:id/tasks',(req,res,next)=>{
  const {id}=req.params
  User.findById(id,'tasks')
  .then(task=>{
   return res.json(task)
  })
  .catch(e=>next(e))
})
router.put('/:id/tasks/:taskId',(req,res,next)=>{
  const {id,taskId}=req.params
  console.log("bbb",req.params)
  User.findByIdAndUpdate(id,{$push:{tasks:id}},{new:true})
  .then(user=>res.json({id,user}))
  .catch(e=>next(e))
})

router.get('/:id/items',(req,res,next)=>{
  const {id}=req.params
  User.findById(id,'items')
  .then(item=>res.json(item))
  .catch(e=>next(e))
})
router.put('/:id/items/:itemId',(req,res,next)=>{
  const {id,itemId}=req.params
  console.log(req.params)
  User.findByIdAndUpdate(id,{$push:{items:id}},{new:true})
  .then(user=>res.json({id,user}))
  .catch(e=>next(e))
})


module.exports = router