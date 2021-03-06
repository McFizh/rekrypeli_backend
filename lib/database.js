const Mongoose = require('mongoose');

// :::::::::::::::::::::::::::::::::::::::::::::

Mongoose.Promise = global.Promise;
let databaseEnabled = false;

// :::::::::::::::::::::::::::::::::::::::::::::

const scoreSchema = new Mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    intrest1: Boolean,
    intrest2: Boolean,
    intrest3: Boolean,
    intrest4: Boolean,
    permission: Boolean,
    code: String,
    time: Number
});

const scoreModel = Mongoose.model('Scores', scoreSchema);

async function connect() {
    const dburl = process.env.MONGODB_URL;

    let options = {
        useNewUrlParser: true
    };

    if(!dburl || dburl === '') {
        /* eslint-disable no-console */
        console.log('>> MONGODB_URL environment variable not set.. disabling DB methods ..');
        /* eslint-enable no-console */
        return;
    } else {
        databaseEnabled = true;
    }


    if(process.env.MONGODB_USERNAME) {
        options.user = process.env.MONGODB_USERNAME;
    }

    if(process.env.MONGODB_PASSWORD) {
        options.pass = process.env.MONGODB_PASSWORD;
    }

    try {
        await Mongoose.connect(dburl,options);
        /* eslint-disable no-console */
        console.log('>> Connected to MongoDB..');
        /* eslint-enable no-console */
    } catch(err) {
        /* eslint-disable no-console */
        console.log('>> Unable to connect to database .. exiting ..');
        console.log(err);
        /* eslint-enable no-console */
        process.exit(1);
    }
}

// :::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
    connect,
    scoreModel,
    databaseEnabled,
};
