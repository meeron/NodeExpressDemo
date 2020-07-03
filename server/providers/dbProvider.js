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
}

module.exports = new DbProvider();