const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.CONNECTOIN_URL , { useUnifiedTopology: true })
.then(() => {
    console.log('Connected to Database')
})
.catch(error => console.error(error))
