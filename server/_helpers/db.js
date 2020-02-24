const config = require('../config.json');
const mongoose = require('mongoose');
const mongoURL = process.env.MONGODB_URI || config.connectionString;

async function initMongo() {
    console.log('Initialising MongoDB...')
    let success = false
    while (!success) {
        try {
            client = await mongoose.connect(mongoURL,
                { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
            success = true
        } catch {
            console.log('Error connecting to MongoDB, retrying in 1 second')
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
    console.log('MongoDB initialised')
    return client
}

initMongo()
// mongoose.connect(
//     process.env.MONGODB_URI || config.connectionString,
//     { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
// );
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Login: require('../logins/login.model')
};