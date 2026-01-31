import { MongoClient } from "mongodb";

// Connection URL
const client = new MongoClient("mongodb://localhost:27017");

export const db = client.db("myProjectDB");

export const checkConnection = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to DB....😍😍");
  } catch (error) {
    console.log("Connected faulte to DB....😢😢 " + error);
  }
};
