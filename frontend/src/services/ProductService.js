import axios from 'axios';
import { setToken } from '../config/axios';

class ProductService {

  async getProducts() {
    try {
      setToken();
      const res = await axios.get('/products');
      return res.data;
    } catch (err) {
      return null;
    }
  }

  async addProduct(product) {
    try {
      setToken();
      product.instock = /true/.test(product.instock);
      const res = await axios.post('/products', product);
      return res.data;
    } catch (err) {
      return null;
    }
  }

  async updateProduct(product) {
    try {
      setToken();
      const res = await axios.put(`/products/${product.id}`, product);
      return res.data;
    } catch (err) {
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const res = await axios.delete(`/products/${id}`);
      return res.data;
    } catch (err) {
      return null;
    }
  }

}

const productService = new ProductService();
export default productService;