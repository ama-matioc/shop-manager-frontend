import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const Homepage = () => {

    const [products, setProducts] =useState([]);
    const handleGetRequest = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/product');
            console.log(response.data.products);
            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetRequest();
    }, []);

    return (
        <div>
            <h1>Shop Manager</h1>
            <div className="search-add-container">
    <input 
        type="text"
        placeholder="Search for a product"
        className="search-bar"
    />
        <button className="add-btn">Add Product</button>
    </div>

            <div className='product-container'>
                {   products.map(product => (
                        <div key={product.id} className='product-card'>
                            <img src={product.thumbnail} alt="image"/>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Homepage;