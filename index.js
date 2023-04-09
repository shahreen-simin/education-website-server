const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://tasbiulhasan08:olive182@cluster0.p9m22cu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();
        const postCollection = client.db('Education_Management_System').collection('posts');

        app.get('/posts', async(req, res)=>{
            const query = {};
            const cursor =  postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
        })
        
        app.post('/posts', async(req, res)=>{
            const announce = req.body;
            const result = await postCollection.insertOne(announce);
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
