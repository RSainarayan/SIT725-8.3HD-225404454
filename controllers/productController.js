const Product = require('../models/Product');
const path = require('path');

// API: list products as JSON
exports.apiIndex = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.json(products);
};

// API: single product JSON
exports.apiShow = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

// API: get total quantity of all products
exports.apiTotalQuantity = async (req, res) => {
  const products = await Product.find().lean();
  const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  res.json({ totalQuantity });
};

// Serve static HTML pages from views folder (if needed elsewhere)
exports.pageNew = (req, res) => {
  res.render('products/new');
};

exports.pageIndex = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.render('products/index', { products });
};

exports.pageShow = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).send('Product not found');
  res.render('products/show', { product });
};

exports.create = async (req, res) => {
  const { name, sku, quantity, location } = req.body;
  try {
    await Product.create({ name, sku, quantity, location });
    res.redirect('/products');
  } catch (err) {
    res.status(400).send('Error creating product: ' + err.message);
  }
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
