const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://shahreenrahman18:shahreen1234@cluster0.yube51c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try {
        await client.connect();
        const postCollection = client.db('Education_Management_System').collection('posts');
        const jobPostCollection = client.db('Education_Management_System').collection('jobs');

        app.get('/posts', async(req, res)=>{
            // const query = {};
            const cursor =  postCollection.find({});
            const posts = await cursor.toArray();
            res.send(posts);
        })
        
        app.post('/posts', async(req, res)=>{
            const announce = req.body;
            const result = await postCollection.insertOne(announce);
            return res.send(result);
        })

        
        app.get('/jobs', async(req, res)=>{
            // const query = {};
            const cursor =  jobPostCollection.find({});
            const jobs = await cursor.toArray();
            res.send(jobs);
        })
        
        app.post('/jobs', async(req, res)=>{
            const jobs = req.body;
            const result = await jobPostCollection.insertOne(jobs);
            return res.send(result);
        })
    } 
    finally {
        
    }
}

run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Hello from Education management system');
})

app.listen(port,()=>{
    console.log(`Education management system portal app listening on port ${port}`);
})