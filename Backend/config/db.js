const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MANGO_DB, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};


module.exports= connectDB;