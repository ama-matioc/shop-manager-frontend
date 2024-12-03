import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AxiosHandler from '../handlers/AxiosHandler';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const axiosHandler = new AxiosHandler('http://localhost:5000');

    const [products, setProducts] =useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await axiosHandler.handleGetRequest("/get-all-items");
            console.log(data.data);
            const productArray = Object.values(data.data);
            setProducts(productArray);
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Shop Manager</h1>
            <div className="search-add-container">
                <div className="search-container">
                    <input 
                        type="text"
                        placeholder="Search for a product"
                        className="search-bar"
                    />
                    <button className="btn">Search</button>
                </div>
            <button className="btn" onClick={() => {navigate('/addProduct');}}>Add Product</button>
            </div>
            <button className="btn" onClick={() => {navigate('/login');}}>Login</button>

            <div className='product-container'>
                {   products.map((product, index) => (
                        <div key={index} className='product-card'>
                            <img src={product.thumbnail} alt="image"/>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <div className='product-buttons'>  
                                <button >Edit</button>
                                <button >Delete</button>
                                <button >View</button>
                             </div>
                        </div>

                    ))
                }
            </div>

        </div>
    );
};

export default Homepage;