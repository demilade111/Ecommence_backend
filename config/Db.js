const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`mongodb connected successfully`);
  } catch (error) {
    console.log(error);
  }
};


module.exports = connectDb;
