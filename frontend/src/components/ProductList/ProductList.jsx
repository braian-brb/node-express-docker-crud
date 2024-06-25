import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddProductForm from '../AddProductForm/AddProductForm.jsx';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // null cuando no hay producto seleccionado

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
    setSelectedProduct(null); // Limpiar el producto seleccionado después de agregar
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setSelectedProduct(null); // Limpiar el producto seleccionado después de actualizar
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Establecer el producto actual para editar
  };

  const handleAddProduct = () => {
    setSelectedProduct({}); // Establecer como objeto vacío para nuevo producto
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
            <button onClick={() => handleEdit(product)} className="action-button edit-button">
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
      {selectedProduct !== null ? (
        <AddProductForm product={selectedProduct} onProductAdded={handleProductAdded} onProductUpdated={handleProductUpdated} />
      ) : null}
      <button onClick={handleAddProduct} className="toggle-form-button">
        Agregar Producto
      </button>
    </main>
  );
}

export default ProductList;
