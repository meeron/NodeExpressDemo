const { Timestamp } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

class DbProvider {

  constructor() {
    this._db = null;
  }

  async init() {
    const client = await MongoClient.connect('mongodb://localhost');
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

module.exports = new DbProvider();
