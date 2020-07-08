import mongo from 'mongodb';
const { MongoClient } = mongo;

class DbProvider {

  constructor() {
    this._db = null;
  }

  async init() {
    if (!process.env.NodeExpressDemo_Db) {
      throw "Db connection string is not defined"
    }

    const options = {
      // Enables the new unified topology layer
      useUnifiedTopology: true,

      // Only applies to the unified topology. How long to block for server selection before throwing an error
      serverSelectionTimeoutMS: 3000,
    };

    console.log(`Connecting to ${process.env.NodeExpressDemo_Db}...`);
    const client = await MongoClient.connect(process.env.NodeExpressDemo_Db, options);
    console.log('Connected.');

    this._db = client.db('NodeExpressDemo');
  }

  async insert(collection, data) {
    await this._db.collection(collection).insertOne(data);
  }

  async getAll(collection) {
    const data = await this._db.collection(collection)
      .find({}).toArray();

    return data;
  }

  async getById(collection, id) {
    return await this._db.collection(collection)
      .findOne({ _id: id});
  }

  async delete(collection, filter) {
    await this._db.collection(collection)
      .deleteOne(filter);
  }

  async update(collection, filter, data) {
    await this._db.collection(collection)
      .updateOne(filter, {
        $set: data,
        $currentDate: { updatedAtUtc: true },
      });
  }
}

export default new DbProvider();
