import { useNavigate } from "react-router-dom";
import '../css/Product.css';

function ProductDetails({ product, onDeleteProduct }) {
  const navigate = useNavigate();

  function editHandler() {
    navigate('/product/edit', { state: product })
  }

  function deleteHandler() {
    onDeleteProduct(product.id);
  }

  return (
    <>
      <tr className="list-item">
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.origin}</td>
        <td>{product.instock == 1 ? 'Yes' : 'No'}</td>
        <td>
          <div style={{display: 'flex', gap: '10px'}}>
            <button onClick={editHandler} className="btn btn-edit small">Edit</button>
            <button onClick={deleteHandler} className="btn btn-cancel small">Delete</button>
          </div>
        </td>
      </tr>
    </>
  )
}

export default ProductDetails;