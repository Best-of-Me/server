genericCRUD = model => {
  const express = require("express");
  const router = express.Router();
  const Model = require(`../models/${model}`);

  router.get("/", (req, res, next) => {
    Model.find({},{password:0}).then(list => {
      if (list) {
        res.status(200).json(list)
        return
      }
      res.status(204).json({message:`${req.path}not found`})
      return
    })
    .catch(e => next(e))
  });
  router.get("/:id", (req, res, next) => {
    const {id}=req.params
    Model.findById(id,{password:0}).then(result => {
      if (result) {
        res.status(200).json(result)
        return
      }
      res.status(204).json({message:`${req.path}not found`})
      return
    })
    .catch(e => next(e))
  });
  router.post("/", (req, res, next) => {
    const object = {...req.body}
    if(Object.keys(object).length === 0) {
      res.status(400).json({message:'Empty data'})
      return
    }
    Model.create(object).then(result => {
      if (result) {
        res.status(200).json(result)
        return
      }
      res.status(204).json({message:`${req.path}not found`})
      return
    })
    .catch(e => next(e))
  });
  router.put("/:id", (req, res, next) => {
    res.json({ message: `put /${model}/${req.params.id}` });
  });
  router.delete("/:id", (req, res, next) => {
    res.json({ message: `delete /${model}/${req.params.id}` });
  });

  return router;
};

module.exports = genericCRUD;
