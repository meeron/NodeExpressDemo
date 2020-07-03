const exceptions = require('../exceptions');
const productsService = require('../services/products');

async function listOfProducts() {
    return await productsService.getAll();
}

async function getProduct(params) {
    return await productsService.getById(params.id);
}

async function addProduct(params, request) {
    if (!request?.name) exceptions.badRequest("'name' is required");

    return await productsService.insert({
        name: request.name,
    });
}

async function deleteProduct(params) {
    await productsService.delete(params.id);
}

async function updateProduct(params, request) {
    if (!request?.name) exceptions.badRequest("'name' is required");

    return await productsService.update(params.id, request);
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