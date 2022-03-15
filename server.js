require('dotenv').config();

// Express
const cors = require('cors');
const express = require('express');
const req = require('express/lib/request');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const passport = require('./src/5.routers/passport');

app.use(passport.initialize());

app.use('/api/', require('./src/5.routers/users'));
app.use('/api/cities', require('./src/5.routers/cities'));
app.use('/api/itineraries', require('./src/5.routers/itineraries'));
app.use('/api/', passport.authenticate('jwt', { session: false }), require('./src/5.routers/checks'));
//app.use('/api/checkuser', require('./src/5.routers/checks'));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

// Mongoose
const mongoose = require('mongoose');
const mongoDBAccess = require('./keys');

mongoose.connect(mongoDBAccess.mongoDBKey, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.log(err));
