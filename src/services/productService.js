import * as productRepository from '../repositories/productRepository.js';

export const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

export const getProductById = async (id) => {
  return await productRepository.getProductById(id);
};

export const createProduct = async (productData) => {
  return await productRepository.createProduct(productData);
};

export const updateProduct = async (id, productData) => {
  return await productRepository.updateProduct(id, productData);
};

export const deleteProduct = async (id) => {
  return await productRepository.deleteProduct(id);
};

export const deleteAllProducts = async () => {
  return await productRepository.deleteAllProducts();
};