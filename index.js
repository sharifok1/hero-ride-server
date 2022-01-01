const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require('cors');
const app = express();
require('dotenv').config();
const  ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 3010
app.use(cors());
app.use(express.json());

// strip key// for payment implementation //if needed
// const stripe = require("stripe")(process.env. STRIPE_SECREET_KEY);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he93e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run(){
  try {
    await client.connect();
    const database = client.db('HeroRider');
    const RiderCollection = database.collection('RiderCollection');
    const LearnerCollection = database.collection('LearnerCollection');
    const userCollection = database.collection('userCollection');
    // const myUserCollection = database.collection('users');
  
 //Post method  Method (single document)-----------API--Post
 app.post('/userCollection', async(req,res)=>{
  const user = req.body;
  const result = await userCollection.insertOne(user);
  res.json(result)
  console.log(result)
})
 app.post('/LearnerCollection', async(req,res)=>{
  const Learner= req.body;
  const result = await LearnerCollection.insertOne(Learner);
  res.json(result)
  console.log(result)
})
 //Get Metod  get all RiderCollection---------------------API--get all
 app.get('/RiderCollection', async(req, res)=>{
  const Rider = RiderCollection.find({});
  const result = await Rider.toArray();
  res.send(result)
})
  //
  //  //update method for make admin-----------------------admin api
  //  app.put('/user/admin', async(req, res)=>{
  //   const user = req.body;
  //   // console.log(user)
  //   const filter = {email: user.email};
  //   const updateDoc = {$set:{role:'admin'}};
  //   const result = await myUserCollection.updateOne(filter, updateDoc);
  //   res.json(result);
  // })
  //get admin user-----------------------------------get admin user
  // app.get('/users/:email', async(req, res) =>{
  //   const email = req.params.email;
  //   const query = { email: email};
  //   const user = await myUserCollection.findOne(query)
  //   let isAdmin = false;
  //   if(user?.role == 'admin'){
  //     isAdmin = true
  //   }
  //   res.json({admin: isAdmin})
  // })

  

 
// Get method for find specefic document by id---------API-- get one
// app.get('/myDocs/:id', async(req,res)=>{
//   const id = req.params.id;
//   const quary = {_id:ObjectId(id)};
//   const result = await myDocsCollection.findOne(quary);
//   res.send(result)

// })
  //Delete Method  delete a doc-----------------API--Delete 
  // app.delete('/myDocs/:id', async(req, res)=>{
  //   const id = req.params.id;
  //   const query = {_id:ObjectId(id)};
  //   const result = await myDocsCollection.deleteOne(query);
  //   // console.log('deleted id', result);
  //   res.json(result); 
  // })


    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/' , (req, res)=>{
  res.json('hero rider is running');
})

app.listen(port, ()=> {
  console.log('hero rider is running and listing from',port)
})
