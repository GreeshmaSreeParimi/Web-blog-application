import { MongoClient } from "mongodb";
let db;

async function connectToDB(callback) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    db = client.db('web-blog-database');
    console.log(callback);
    callback();

}
export {
    db,connectToDB,
};