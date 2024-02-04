import '../css/Product.css';
import ProductDetails from './ProductDetails';
import ConfirmDialog from "../modal/ConfirmDialog";
import { useState } from "react";

function ProductList({ products, onDeleteProduct }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productId, setProductId] = useState();

  function deleteProduct(id) {
    setProductId(id);
    setShowConfirmDialog(true);
  }

  function deleteHandler() {
    onDeleteProduct(productId);
    setShowConfirmDialog(false);
  }

  function cancelHandler() {
    setShowConfirmDialog(false);
  }

  return (
    <div className="product">
      <h1>Product List</h1>
      <div className='product-list'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Origin</th>
              <th>In stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => (
              <ProductDetails
                key={prod.id}
                product={prod}
                onDeleteProduct={deleteProduct} />
            ))
            }
          </tbody>
        </table>

        {showConfirmDialog && <ConfirmDialog
          message='Are you sure to delete this product?'
          onConfirm={deleteHandler}
          onCancel={cancelHandler}
        />}

      </div>
    </div>
  )
}

export default ProductList;