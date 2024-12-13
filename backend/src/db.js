const mongoose = require('mongoose')

const dbUri = process.env.DB_URI;

const connectMongo = async () =>
  mongoose.connect(dbUri, {
    dbName: process.env.DB_NAME,
    autoIndex: true,
    autoCreate: true,
  });

// eslint-disable-next-line consistent-return
const dbConnection = async () => {
  try {
    const mongoConnection = await connectMongo();
    return mongoConnection;
  } catch (error) {
    console.log('erro occured first time ', error);
    setTimeout(() => {
      console.log('attempting connection again in 15 seconds');
      return dbConnection();
    }, 15000);
  }
};

module.exports = dbConnection