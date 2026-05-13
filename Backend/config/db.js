import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shelkesunil072_db_user:03GV3mUKk111anhD@cluster0.b7kthqn.mongodb.net/RealState"
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};