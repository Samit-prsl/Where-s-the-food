const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const dbConnection  = require("./db")
const routes = require('./routes/routes')

const app = express()
const PORT  = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.status(200).json('Hello!!!!!');
});
app.use('/api',routes)

dbConnection()
  .then(() => {
    console.log(`Mongodb connected`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
  });


