const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", (req, res, next) => {
  res.status(404).end("/user not-found");
});

router.get("/random",(req,res,next)=>{
  Task.aggregate(
    [ { $sample: { size: 3 } } ]
 )
 .then(result=>{
    if (result.length) {
      res.status(200).json(result)
      return
    }
    res.status(204).json({message:`${req.path} not found`})
    return
  })
 .catch(e => next(e))
})

router.post("/random/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { order } = req.query;
  if(!order){
    res.status(400).json({ message: `Order is required` });
    return;
  }
  return Task.aggregate([{ $sample: { size: 1 } }])
  .then(task => {
    return User.findByIdAndUpdate(userId, {
      tasks: { $push: { task: task._id, order } }
    });
  })
  .then(result => {
    if (result.length) {
      res.status(200).json(result);
      return;
    }
    res.status(204).json({ message: `${req.path} not found` });
    return;
  })
  .catch(e => next(e));
});
router.get("/:id", (req, res, next) => {
  let { id } = req.params;
  Task.find({ _id: ObjectId(id) })
    .then(result => {
      if (result.length) {
        res.status(200).json(result);
        return;
      }
      res.status(204).json({ message: `${req.path} not found` });
      return;
    })
    .catch(e => next(e));
});
module.exports = router;
