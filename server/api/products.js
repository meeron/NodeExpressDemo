import { badRequest } from '../exceptions.js';
import productsService from '../services/products.js';

async function listOfProducts() {
    return await productsService.getAll();
}

async function getProduct(params) {
    return await productsService.getById(params.id);
}

async function addProduct(params, request) {
    if (!request?.name) badRequest("'name' is required");

    return await productsService.insert({
        name: request.name,
    });
}

async function deleteProduct(params) {
    await productsService.delete(params.id);
}

async function updateProduct(params, request) {
    if (!request?.name) badRequest("'name' is required");

    return await productsService.update(params.id, request);
}

export default function () {
    return [
        { path: '/products', handler: listOfProducts, useAuth: true },
        { path: '/products/:id', handler: getProduct, useAuth: true },
        { path: '/products', method: 'post', handler: addProduct, useAuth: true },
        { path: '/products/:id', method: 'delete', handler: deleteProduct, useAuth: true },
        { path: '/products/:id', method: 'put', handler: updateProduct, useAuth: true },
    ];
}