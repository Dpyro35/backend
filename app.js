const express = require('express');
const app = express();
const connecttomongo = require('./db');
const cors = require('cors')
const bodyParser=require('body-parser')
const cloudinary =require('cloudinary')

const errorMiddleware = require('./middlewares/error.js')
app.use(cors())
connecttomongo();
cloudinary.v2.config({
    cloud_name:'dn61g7lg7',
    api_key:"259645331793567",
    api_secret:"VedKe2fNE4ewMUDIIo5o2yUibSM"
})

app.use(bodyParser.json({limit: '500000mb'})); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true,limit: '500000mb' })); 
app.use(express.json({limit: '50000mb'}));

app.use('/api/user', require('./routes/user.js'));
app.use('/api/admin', require('./routes/admin.js'));

app.use(errorMiddleware);
module.exports = app;