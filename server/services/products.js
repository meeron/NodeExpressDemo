import dbProvider from '../providers/dbProvider.js';

const COLLECTION = 'Products';

function mapProduct(product) {
    const { _id, ...item } = product;

    return { id: _id, ...item };    
}

class ProductsService {
    async getAll() {
        const products = await dbProvider.getAll(COLLECTION);

        return products.map(mapProduct);
    }

    async insert(request) {
        const { name } = request;

        const newProduct = {
            _id: Date.now(),
            name,
            createdAtUtc: new Date(),
            updatedAtUtc: null,
        };

        await dbProvider.insert(COLLECTION, newProduct);

        return mapProduct(newProduct);
    }

    async getById(id) {
        const product = await dbProvider.getById(COLLECTION, parseInt(id));
        if (!product) return;

        return mapProduct(product);
    }

    async delete(id) {
        await dbProvider.delete(COLLECTION, { _id: parseInt(id) });
    }

    async update(id, request) {
        const product = await this.getById(id);
        if (!product) return;

        const { name } = request;

        await dbProvider.update(COLLECTION, { _id: parseInt(id) }, { name });

        return this.getById(id);
    }
}

export default new ProductsService();