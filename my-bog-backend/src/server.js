import express, { json } from "express";
import {db,connectToDB} from './database.js';
import fs from 'fs';
import admin from 'firebase-admin';

const credentials = JSON.parse(
    fs.readFileSync('./web-blog-credentials.json')

);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});


const app = express();
app.use(express.json());

app.use(async (req,res,next)=>{

    const {authtoken} = req.headers;
    if(authtoken){
        try{
            const user = await admin.auth().verifyIdToken(authtoken);
            req.user = user;
        }catch(e){
           return res.sendStatus(400);
        }
        
    }
    req.user = req.user || {};
    next();
});

 app.get("/api/articles/:name", async (req,res)=>{
    const {name} = req.params;
    const { uid } = req.user;

    const article = await db.collection('Articles').findOne({name});
    if(article){
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    }
    else { 
        res.sendStatus(404);
    }

});

app.use(async (req,res,next)=>{

    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
});

app.put("/api/articles/:name/upvote",async (req,res)=>{
    const {name} = req.params;
    const {uid} = req.user;

    const article = await db.collection('Articles').findOne({name});
    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
        if(canUpvote){
            await db.collection('Articles').updateOne({name},{
                $inc :{upvotes:1},
                $push : {upvoteIds : uid},
            });

        }
        const updatedarticle = await db.collection('Articles').findOne({name});
        res.json(updatedarticle);
    }else{
        res.send(`Requested article does not exists`);
    }
    
});

app.post("/api/articles/:name/comments", async (req,res)=>{
    const {text} = req.body;
    const {name} = req.params;
    const {email} = req.user;

    await db.collection('Articles').updateOne({name},{
        $push :{comments:
            {
            postedBy :email,text
          }
        }
    });

    const article = await db.collection('Articles').findOne({name});
    if(article){
        res.json(article);
    }else{
        res.send(`Requested article does not exists`);
    }

});

// we are passing this function as call back to db connected method. it would call this method once db is coonected.
function startServer(){
    console.log("database connected"); 
    app.listen(8000,()=>{
        console.log("Server is listening on port 8000");
    })
}

connectToDB(startServer);
