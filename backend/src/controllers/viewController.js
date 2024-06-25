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
    const { name, description, price, image, category, quantity } = req.body;
    await productService.createProduct({ name, description, price, image, category, quantity });
    res.redirect('/products');
  } catch (error) {
    res.status(500).send('Error creating product');
  }
};

export const deleteAllProducts = async (req, res) => {
    try {
        await productService.deleteAllProducts();
        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting products:', error.message);
        res.status(500).send(`Error deleting products: ${error.message}`);
    }
};
