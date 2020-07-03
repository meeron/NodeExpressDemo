const exceptions = require('../exceptions');

const products = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Orange' },
    { id: 3, name: 'Pineapple' },
];

function listOfProducts() {
    return products;
}

function getProduct(params) {
    return products.find(p => p.id == params.id);
}

function addProduct(params, request) {
    if (!request?.name) exceptions.badRequest("'name' is required");

    const newProduct = {
        id: Date.now(),
        name: request.name,
    };

    products.push(newProduct);

    return newProduct;
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