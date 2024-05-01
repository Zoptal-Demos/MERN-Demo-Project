const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`, {user: process.env.DB_USER, pass: process.env.DB_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex : true
}).then(() => {
    console.log(`Database Connected Successfully to ${process.env.DB_HOST}`);
}).catch((err) => {
    console.log(err.mongoose)
});