
const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./routes/admin');
const userRoute  = require('./routes/user')
const port = 4000;
const cors = require('cors');

app = express();
app.use(cors())
app.use(express.json());



app.use('/admin',adminRoute);
app.use('/user',userRoute)
mongoose.connect('mongodb+srv://sarathkp:<password>@cluster0.bju2rt8.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'courses' })
app.listen(port, () => { console.log(`listening to port ${port}`) });
