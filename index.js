const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

/* middleware */
require('dotenv').config()
app.use(cors())
app.use(express.json())

/* ===============  Mongodb ========== */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pq2gl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const collectionService = client.db("Services").collection("product");
    /*============== Product get ====================== */
    app.get('/products', async (req, res) => {
      /* http://localhost:5000/products */

      if (req.query) {
        const query = req.query;
        const cursor = collectionService.find(query);
        const result = await cursor.toArray();
        res.send(result)
      }
      else {
        const cursor = collectionService.find(query);
        const result = await cursor.toArray();
        res.send(result)
      }
    })
  }
  finally {
    //await  client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})