import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddProductForm from '../AddProductForm/AddProductForm.jsx';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const getDefaultImage = () => {
    return 'https://imgs.search.brave.com/6W5_xsXlZSAOqmcuRUka3mDJ4ONzxycnwIAaIIlVv8U/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/bWVtZWdlbmVyYXRv/ci5lcy9pbWFnZW5l/cy9tZW1lcy9mdWxs/LzQvNzIvNDcyMTIw/MC5qcGc';
  };

  const handleImageError = (e) => {
    if (!e.target.src.includes(getDefaultImage())) {
      e.target.src = getDefaultImage();
    }
  };

  return (
    <main>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
        {showForm ? 'Cerrar formulario' : 'Agregar Producto'}
      </button>
      {showForm && <AddProductForm onProductAdded={addProduct} />}
      {products.map(product => (
        <div key={product.id} className="product">
          <img src={product.image || getDefaultImage()} onError={handleImageError} alt={product.name} className="product-image"/>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <button onClick={() => handleDelete(product.id)} className="action-button delete-button">
              <FaTrash />
            </button>
            <button className="action-button edit-button">
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default ProductList;
