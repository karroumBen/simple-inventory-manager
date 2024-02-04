import { useState, useRef, useEffect } from 'react';
import '../css/Product.css';
import DisplayMessage from '../components/DisplayMessage';
import ProductService from '../services/ProductService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useValidate } from '../helper/useValidate';

function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ error, setError, validate ] = useValidate();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    origin: "",
    instock: ""
  });
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    if (location.state) {
      const editProduct = location.state;
      setProduct({id: editProduct.id,
                  name: editProduct.name,
                  price: editProduct.price,
                  origin: editProduct.origin,
                  instock: editProduct.instock})
    }
  }, [location.state])

  async function editProductHandler(e) {
    e.preventDefault();
    
    // validate
    if (validate(product)) {
      const res = await ProductService.updateProduct({...product});
      if (res) {
        if (res.success) {
          // go to product list
          navigate("/");
        } else {
          setError(res.error);
        }
      } else {
        setError('There is something wrong. Please try again.');
      }
    }
  }

  function cancelHandler(e) {
    e.preventDefault();
    // back to product list
    navigate("/");
  }

  function changeHandler(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  return (
    <div className="add-product">
      <div className="box">
        <h1>Edit Product</h1>
        <form method='post' onSubmit={editProductHandler}>
          <div className="error_container">
            {error && <DisplayMessage message={error} type="error" />}
          </div>

          <div className="form_control_wrapper">
            <div className="form_control">
              <label className="label">ID</label>
            </div>
            <div className="form_control">
              <input type="text" name="id" value={product.id} className="input-text" disabled />
            </div>
          </div>

          <div className="form_control_wrapper">
            <div className="form_control">
              <label className="label">Name</label>
            </div>
            <div className="form_control">
              <input type="text" name="name" value={product.name} ref={nameRef}
                onChange={changeHandler} required className="input-text" 
                aria-label="name" />
            </div>
          </div>

          <div className="form_control_wrapper">
            <div className="form_control">
              <label className="label">Price</label>
            </div>
            <div className="form_control">
              <input type="text" name="price" value={product.price}
                onChange={changeHandler} required className="input-text" />
            </div>
          </div>

          <div className="form_control_wrapper">
            <div className="form_control">
              <label className="label">Origin</label>
            </div>
            <div className="form_control">
              <input type="text" name="origin" value={product.origin}
                onChange={changeHandler} required className="input-text" />
            </div>
          </div>

          <div className="form_control_wrapper">
            <div className="form_control">
              <label className="label">In Stock</label>
            </div>
            <div className="form_control">
              <select className="select" name="instock"
                value={product.instock} onChange={changeHandler}>
                <option value={1}>Yes</option>
                <option value={2}>No</option>
              </select>
            </div>
          </div>
          
          <div className="actions">
            <button className="btn btn-edit small">&nbsp;Edit&nbsp;</button>
            <button onClick={cancelHandler} className="btn btn-cancel small ml">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct;