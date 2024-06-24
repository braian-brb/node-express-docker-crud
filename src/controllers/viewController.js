import * as productService from '../services/productService.js';

export const renderAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.render('index', { products });
  } catch (error) {
    res.status(500).send('Error retrieving products');
  }
};

export const renderNewProductForm = (req, res) => {
  res.render('newProduct');
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    await productService.createProduct({ name, description, price, image, category });
    res.redirect('/products');
  } catch (error) {
    res.status(500).send('Error creating product');
  }
};
