import { db } from "../connectionDB.js";
const COLLECTION_NAME = "logs";

const initLogsModel = async () => {
  const collections = await db
    .listCollections({ name: COLLECTION_NAME })
    .toArray();

  if (collections.length === 0) {
    await db.createCollection(COLLECTION_NAME, {
      capped: true,
      size: 1048576, // 1MB
    });
  }
};

initLogsModel();

const logsModel = db.collection(COLLECTION_NAME);

export default logsModel;
