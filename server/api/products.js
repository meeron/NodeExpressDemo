const exceptions = require('../exceptions');
const productsService = require('../services/products');

function mapProduct(product) {
    const { _id, ...item } = product;

    return { id: _id, ...item };    
}

async function listOfProducts() {
    const items = await productsService.getAll();

    return items.map(mapProduct);
}

async function getProduct(params) {
    const id = parseInt(params.id);
    return await productsService.getById(id);
}

async function addProduct(params, request) {
    if (!request?.name) exceptions.badRequest("'name' is required");

    const newProduct = {
        name: request.name,
    };

    await productsService.insert(newProduct);

    return mapProduct(newProduct);
}

function deleteProduct(params) {
    const index = products.findIndex(p => p.id == params.id);
    const result = { status: 'NotFound' };

    if (index > -1) {
        products.splice(index, 1);
        result.status = 'Ok';
    }

    return result;
}

function updateProduct(params, request) {
    console.log(params, request);
    if (!request?.name) exceptions.badRequest("'name' is required");
    
    const index = products.findIndex(p => p.id == params.id);
    if (index === -1) return null;

    products[index].name = request.name;

    return products[index];
}

module.exports = function () {
    return [
        { path: '/products', handler: listOfProducts },
        { path: '/products/:id', handler: getProduct },
        { path: '/products', method: 'post', handler: addProduct },
        { path: '/products/:id', method: 'delete', handler: deleteProduct },
        { path: '/products/:id', method: 'put', handler: updateProduct },
    ];
}