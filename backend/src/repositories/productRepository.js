import Product from '../models/product.js';

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id) => {
  return await Product.findByPk(id);
};

export const createProduct = async (productData) => {
  return await Product.create(productData);
};

export const updateProduct = async (id, productData) => {
  const product = await getProductById(id);
  if (!product) return null;
  return await product.update(productData);
};

export const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) return null;
  await product.destroy();
  return product;
};

export const deleteAllProducts = async () => {
  return await Product.destroy({ truncate: true });
};
