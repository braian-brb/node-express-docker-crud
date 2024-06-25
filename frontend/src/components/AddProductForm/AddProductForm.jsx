// src/components/AddProductForm/AddProductForm.jsx
import { useState } from 'react';
import axios from 'axios';
import './AddProductForm.css';

// eslint-disable-next-line react/prop-types
function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/products', formData)
      .then(response => {
        onProductAdded(response.data); // Actualiza la lista de productos en el padre
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
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input type="text" name="name" placeholder="Nombre del producto" value={formData.name} onChange={handleChange} />
      <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
      <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
      <input type="text" name="image" placeholder="URL de la imagen" value={formData.image} onChange={handleChange} />
      <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Cantidad" value={formData.quantity} onChange={handleChange} />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default AddProductForm;
