import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AxiosHandler from '../handlers/AxiosHandler';
import '../App.css'

const Homepage = () => {

    const axiosHandler = new AxiosHandler('https://dummyjson.com');

    const [products, setProducts] =useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await axiosHandler.handleGetRequest("/products");
            console.log(data.products);
            setProducts(data.products);
        }
        fetchProducts();
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