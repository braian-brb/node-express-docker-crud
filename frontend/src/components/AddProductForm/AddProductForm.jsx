/* eslint-disable react/prop-types */
// src/components/AddProductForm/AddProductForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProductForm.css';

function AddProductForm({ product, onProductAdded, onProductUpdated }) {
  const [formData, setFormData] = useState({
    name: product ? product.name : '',
    description: product ? product.description : '',
    price: product ? product.price : '',
    image: product ? product.image : '',
    category: product ? product.category : '',
    quantity: product ? product.quantity : ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: product.quantity
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = product && product.id ? `http://localhost:4000/api/products/${product.id}` : 'http://localhost:4000/api/products';
    const method = product && product.id ? axios.put : axios.post;
  
    method(url, formData)
      .then(response => {
        if (product && product.id) {
          onProductUpdated(response.data);
        } else {
          onProductAdded(response.data);
        }
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
          quantity: ''
        });
      })
      .catch(error => console.error('Error saving product:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input type="text" name="name" placeholder="Nombre del producto" value={formData.name} onChange={handleChange} />
      <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
      <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
      <input type="text" name="image" placeholder="URL de la imagen" value={formData.image} onChange={handleChange} />
      <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Cantidad" value={formData.quantity} onChange={handleChange} />
      <button type="submit">{product ? 'Actualizar Producto' : 'Agregar Producto'}</button>
    </form>
  );
}

export default AddProductForm;
