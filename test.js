const mongoose = require('mongoose')

const connect = async () => {
    const URI = process.env.MONGODB_URL

    mongoose.connect(URI)
        .then(() => console.log('Connected to database movieDB'))
        .catch((err) => console.log(err));
}

connect();