
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const skillRoutes = require('./routes/skillRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/skills', skillRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.log(err));
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("Mongo Error ❌", err));
