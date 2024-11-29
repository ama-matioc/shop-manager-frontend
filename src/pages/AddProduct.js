import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import AxiosHandler from '../handlers/AxiosHandler';

const AddProduct = ({ onAddProduct }) => {
    const navigate = useNavigate();
    const axiosHandler = new AxiosHandler("http://localhost:5000")

    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        brand: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleAddProduct = async (product) => {
        axiosHandler.handlePostRequest("/add-item", {
            collection: "inventory",
            item_id: product.title,
            data: {
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                image: product.image
            }
        })
    };

    return (
        <div className="container">
            <h1>Add Product</h1>
            <div className="add-product-container">
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={product.title} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={product.category} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input 
                        type="number" 
                        name="stock" 
                        value={product.stock} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input 
                        type="text" 
                        name="brand" 
                        value={product.brand} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input 
                        type="text" 
                        name="image" 
                        value={product.image} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="button-group">
                    <button onClick={() => {handleAddProduct(product)}} className="add-btn">
                        Add Product
                    </button>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
