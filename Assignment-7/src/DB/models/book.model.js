import { db } from "../connectionDB.js";

await db
  .command({
    collMod: "books",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
          },
          author: {
            bsonType: "string",
          },
        },
      },
    },
  })
  .catch((err) => {
    console.log("Validation already exists or error occurred: ", err.message);
  });

const bookModel = db.collection("books");

export default bookModel;
