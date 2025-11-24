const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


// connect db
connectDB(process.env.MONGO_URI).then(()=>console.log('Mongo connected')).catch(err=>{ console.error(err); process.exit(1); });


// routes
app.use('/api', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
