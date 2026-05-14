import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb://shelkesunil072_db_user:03GV3mUKk111anhD@ac-16vmiwx-shard-00-00.b7kthqn.mongodb.net:27017,ac-16vmiwx-shard-00-01.b7kthqn.mongodb.net:27017,ac-16vmiwx-shard-00-02.b7kthqn.mongodb.net:27017/?ssl=true&replicaSet=atlas-eua1c0-shard-0&authSource=admin&appName=Cluster0"
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};