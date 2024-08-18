import mongoose from "mongoose";
const dbPath = "mongodb+srv://97jamali:123654@cluster0.7up9lgr.mongodb.net/Blog"
import chalk from "chalk";

async function dbConnection() {
  try {
    await mongoose.connect(dbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green("> Successfully connected to the database"));
  } catch (err) {
    console.log(chalk.red("The error occurred:", err.message));
  }
}

export default dbConnection;