const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('./db/conn')
const dotenv = require('dotenv');
const web = require('./routes/routes')
const userRoutes = require('./routes/users')

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.use('/posts',web)
app.use('/user',userRoutes)

app.get('/',(req,res)=>{
    res.send('app is live');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('server is running...')
})