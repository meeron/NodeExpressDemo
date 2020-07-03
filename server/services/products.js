const dbProvider = require('../providers/dbProvider');
const COLLECTION = 'Products';

class ProductsService {
    async getAll() {
        return await dbProvider.getAll(COLLECTION);
    }

    async insert(newProduct) {
        newProduct._id = Date.now();
        await dbProvider.insert(COLLECTION, newProduct);
    }

    async getById(id) {
        return await dbProvider.getById(COLLECTION, id);
    }
}

module.exports = new ProductsService();