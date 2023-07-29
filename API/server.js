const dotenv = require('dotenv');
dotenv.config({path: __dirname + "/config.env"});
const server = require('./app');
const mongoose = require('mongoose');


const URI = process.env.DB_URI || 'mongodb://localhost/CafeRoyale';
const PORT = process.env.PORT || 9999;

// Establish Database Connection
mongoose.connect(URI).then(() => console.log(`Successfully connected to DB 🎉🎉🎈🎈🎊🎊`)).catch((err) => console.log(err));

// Server starts running
server.listen(PORT, () => {
    console.log(`Api running at localhost:${PORT}`);
});