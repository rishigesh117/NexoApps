/**
 * Product Controller — NexoApps Phase 10A
 */

const productService = require('../services/product.service');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts(req.query);
      res.json({ success: true, data: products });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProductBySlug(req, res) {
    try {
      const product = await productService.getProductBySlug(req.params.slug);
      res.json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await productService.getCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ProductController();
