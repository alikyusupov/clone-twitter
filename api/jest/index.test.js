const {MongoClient} = require('mongodb');
require("dotenv").config()
describe('insert', () => {
  let connection;
  let db;

  beforeEach(async () => {
    connection = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
    });
    db = await connection.db(`${process.env.MONGODB_NAME}`);
  });

  afterEach(async () => {
    await connection.close();
  });

  it("should return list of collections ", async () => {
    const list = await db.listCollections().toArray();
    expect(list).toHaveLength(5);
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("mock");

    const mockUser = { _id: "some-user-id", name: "John" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
})