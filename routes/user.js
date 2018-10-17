const express = require("express");
const router = express.Router();
const User = require('../models/User')
const Task = require('../models/Task')
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.post("/:userId", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.put("/:userId", (req, res, next) => {
  res.status(404).end('/user not-found')
});
router.delete("/:userId", (req, res, next) => {
  res.status(404).end('/user not-found')
});

router.get('/:userId/tasks',(req,res,next)=>{
  const {userId}=req.params
  User.findById(userId,'tasks')
  .then(task=>{
   return res.json(task)
  })
  .catch(e=>next(e))
})

router.put('/:userId/tasks',(req,res,next)=>{
  const {userId}=req.params
  const {tasks}=req.body
  const update = { tasks }
  User.findByIdAndUpdate(userId,update,{new:true})
  .then(user=>res.json(user))
  .catch(e=>next(e))
})

router.post('/:userId/tasks/:taskId',(req,res,next)=>{
  const {userId,taskId}=req.params
  User.findByIdAndUpdate(userId,{$push:{completedTasks:{task:taskId}}},{new:true})
  .then(user=>res.json(user))
  .catch(e=>next(e))
})

router.put('/:userId/tasks/random',(req,res,next)=>{
  const {userId}=req.params
  const {index}=req.body
  Task.aggregate(
    [ { $sample: { size: 1 } } ]
  ).then(task=>{
    update = {[`tasks.${index}`]:task[0]._id}
    return User.findByIdAndUpdate(userId,update,{new:true}).populate("tasks")
  })
  .then(user=>{
    res.json(user)})
  .catch(e=>next(e))
})

router.put('/:userId/tasks/:taskId',(req,res,next)=>{
  const {userId,taskId}=req.params
  const {index}=req.body
  update = {[`tasks.${index}`]:ObjectId(taskId)}
  User.findByIdAndUpdate(userId,update,{new:true})
  .then(user=>res.json(user))
  .catch(e=>next(e))
})

router.get('/:userId/items',(req,res,next)=>{
  const {userId}=req.params
  User.findById(userId,'items')
  .then(item=>res.json(item))
  .catch(e=>next(e))
})
router.put('/:userId/items/:itemId',(req,res,next)=>{
  const {userId,itemId}=req.params
  User.findByIdAndUpdate(userId,{$push:{items:itemId}},{new:true})
  .then(user=>res.json(user))
  .catch(e=>next(e))
})


module.exports = router