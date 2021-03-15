const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const users = require("./routes/users");
const posts = require("./routes/posts");
const admin = require("./routes/admin");
const logger = require("./logger/logger").logger;
 

 



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 5000;
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
  
  logger.info("Hello World");
  const options = {
    from: new Date() - (24 * 60 * 60 * 1000),
    until: new Date(),
    limit: 10,
    start: 0,
    order: 'desc',
    fields: ['message']
  };
  res.send('Hello World!')
})

app.use("/api/user", users);
app.use("/api/post", posts);
app.use('/api/admin/',admin);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is Running on PORT", port);
})