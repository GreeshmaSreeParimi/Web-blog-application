import express from "express";
import {db,connectToDB} from './database.js';

let articlesInfo = [{
    name:"learn-react",
    upvotes: 0,
    comments:[],
},
{
    name:"learn-node",
    upvotes: 0,
    comments:[],
},
{
    name:"mongo-db",
    upvotes: 0,
    comments:[],
}];

const app = express();
app.use(express.json());

 app.get("/api/articles/:name", async (req,res)=>{
    const {name} = req.params;


    const article = await db.collection('Articles').findOne({name});
    if(article){
        res.json(article);
    }
    else { 
        res.sendStatus(404);
    }

});

app.put("/api/articles/:name/upvote",async (req,res)=>{
    const {name} = req.params;

    await db.collection('Articles').updateOne({name},{
        $inc :{upvotes:1}
    });

    const article = await db.collection('Articles').findOne({name});
    if(article){
       res.send(article);
    }else{
        res.send(`Requested article does not exists`);
    }
    
});

app.post("/api/articles/:name/comments", async (req,res)=>{
    const { postedBy, text} = req.body;
    const {name} = req.params;

    await db.collection('Articles').updateOne({name},{
        $push :{comments:
            {
            postedBy,text
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
