const mongoose = require("mongoose");

const MONGODB_URL = 'mongodb+srv://user_auth:Owu6dx2qRZqc0gqG@cluster0.fbx6x.mongodb.net/user_auth?retryWrites=true&w=majority';

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Connecting to database failed");
      console.error(error);
      process.exit(1);
    });
};