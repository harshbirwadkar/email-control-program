const express = require('express');

const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const PORT = process.env.PORT || 5000;

const app = express();


app.get('/', (req, res) => res.send('Email Control Program is running!'));

app.use(express.json());
app.use('/api', require('./routes/email'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
