const mongoose = require('mongoose');
const mongoURL = "mongodb://0.0.0.0:27017/inotebook?readPreference=primary&tls=false";

const connectToMongo = async () => {
  try {
    console.log("yes2")
    await mongoose.connect(mongoURL);
    console.log('connected to mongoose');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
