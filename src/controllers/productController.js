const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, image, category } = req.body;
      const newProduct = await Product.create({ name, description, price, image, category });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await Product.findByPk(id);
    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
