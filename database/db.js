import mongoose from "mongoose";

const dbConnection = mongoose
  .connect("mongodb://localhost:27017/passport_login")
  .then(() => {
    console.log("Database connection is ready.....");
  })
  .catch((error) => {
    console.log(`Error : ${error}`);
  });

export { dbConnection };
