require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;

URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.olekz.gcp.mongodb.net/stats?retryWrites=true&w=majority`;

const client = new MongoClient(URI, {
    useUnifiedTopology: true
});

(async () => {
    await client.connect();
    const database = client.db("stats");
    const collection = database.collection("myChessStats");
    // let result = await collection.insertOne({
    //     "month": "August",
    //     "played": 23,
    //     "won": 12,
    //     "rating": 1253
    // })
    // console.log(result.insertedId);
    let cursor = collection.find({});

    while (await cursor.hasNext()) {
        let temp = await cursor.next();
        console.log(temp);
    }
    client.close()
})();

// 