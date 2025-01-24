const mongoose = require('mongoose');

const mongoURI = process.env.CULINARYCREST_APP_DATABASE

const connectToMongo = ()=>{
    mongoose.connect(mongoURI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> {
        console.log("connected")
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports = connectToMongo