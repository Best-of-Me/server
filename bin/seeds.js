// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Item = require("../models/Item");
const Task = require("../models/Task");

const bcryptSalt = 10;

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "alice@alice.com",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "bob@bob.com",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt))
  }
];
let items = [
  {
    name: "Sunglasess",
    description: "Sunglasess for your pet",
    type: "Accessories",
    price: "1,5"
  },
  {
    name: "cap",
    description: "cap for your pet",
    type: "Accessories",
    price: "2"
  },
  {
    name: "Dog",
    description: "A pretty Dog",
    type: "Pets",
    price: "5"
  },
  {
    name: "Cat",
    description: "A pretty Cat",
    type: "Pets",
    price: "5"
  },
  {
    name: "Red",
    description: "Beautifull red background",
    type: "Backgrounds",
    price: "1,5"
  },
  {
    name: "Blue",
    description: "Beautifull blue background",
    type: "Backgrounds",
    price: "1"
  }]
let tasks = [
  {
    name:"Salir a tomar algo",
    description:"Bom quiere ir a tomar algo a una terraza o algún sitio de tu agrado en el que te sientas cómodo",
    points:20
  },{
    name:"Dar un pareo corto",
    description:"A Bom le apetece ir a dar una vuelta para estirar las patas y ver si por fin consigue cazar una mariposa",
    points:10
  },{
    name:"Hacer deporte",
    description:"",
    points:15
  },{
    name:"Cantar Bohemian Rhapsody",
    description:"",
    points:10
  },{
    name:"Visitar un museo",
    description:"",
    points:15
  },{
    name:"Salir a bailar salsa",
    description:"",
    points:15
  },{
    name:"Ducha relajante",
    description:"",
    points:5
  },{
    name:"Recoger la habitación",
    description:"",
    points:10
  }
]
User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
    return Item.deleteMany()
  })
  .then(() => {
    return Item.create(items);
  })
  .then(itemsCreated => {
    console.log(`${itemsCreated.length} items created with the following id:`);
    console.log(itemsCreated.map(u => u._id));
    return Task.deleteMany()
  })
  .then(() => {
    return Task.create(tasks);
  })
  .then(tasksCreated => {
    console.log(`${tasksCreated.length} tasks created with the following id:`);
    console.log(tasksCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
