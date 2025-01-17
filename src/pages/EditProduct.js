import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';
import AxiosHandler from '../handlers/AxiosHandler';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosHandler = new AxiosHandler("http://localhost:5000");

    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        brand: '',
        image: '',
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axiosHandler.handlePostRequest(`/get-item`, {
                    collection: 'inventory',
                    item_id: id,
                });
                const productData = response.data;
                console.log(productData);
                setProduct(productData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleEditProduct = async () => {
        try {
            await axiosHandler.handlePostRequest('/update-item', {
                collection: 'inventory',
                item_id: id,
                updates: {
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    brand: product.brand,
                    image: product.image,
                },
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Edit Product</h1>
            <div className="edit-product-container">
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
                    <button onClick={handleEditProduct} className="edit-btn">
                        Save Changes
                    </button>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
