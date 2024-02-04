import ProductService from '../services/ProductService';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import DisplayMessage from "../components/DisplayMessage";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const res = await ProductService.getProducts();
      if (res) {
        if (res.success) {
          setProducts([...res.data]);
        } else {
          setError(res.error);
        }
      } else {
        setError('There is something wrong. Please try again.');
      }
    }
    getProducts();
  }, [])

  function goToAddProduct() {
    navigate('/product/add');
  }

  async function deleteProduct(id) {
    const res = await ProductService.deleteProduct(id);
    if (res) {
      if (res.success) {
        setProducts(products.filter(prod => prod.id !== id));
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  return (
    <div style={{ padding: '1rem'}}>
      <div>
        {error && <DisplayMessage message={error} type="error" />}
      </div>
      <div>
        <button onClick={goToAddProduct} className='btn medium'>Add New Product</button>
      </div>
      <ProductList products={products} onDeleteProduct={deleteProduct} />
    </div>
  )
}

export default Home;