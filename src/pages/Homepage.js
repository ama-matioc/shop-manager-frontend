import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AxiosHandler from '../handlers/AxiosHandler';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const axiosHandler = new AxiosHandler('http://localhost:5000');

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Products displayed after filtering
    const [search, setSearch] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await axiosHandler.handleGetRequest("/get-all-items");
            console.log(data.data);
            const productArray = Object.values(data.data);
            setProducts(productArray);
            setFilteredProducts(productArray); // Initialize filteredProducts with all products
        }
        fetchProducts();
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === 'search') setSearch(value);
    };

    const handleSearch = () => {
        if (search.trim() === '') {
            setFilteredProducts(products); // Reset to all products if search is empty
        } else {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1 className="navbar-title">Shop Manager</h1>
                <button className="login-btn" onClick={() => {navigate('/login');}}>Login</button>
            </nav>
            <div className="search-add-container">
                <div className="search-container">
                    <input 
                        type="text"
                        placeholder="Search for a product"
                        className="search-bar"
                        name="search"
                        onChange={handleInput}
                    />
                    <button className="btn" onClick={handleSearch}>Search</button>
                </div>
            <button className="btn" onClick={() => {navigate('/addProduct');}}>Add Product</button>
            </div>

            <div className='product-container'>
            {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.thumbnail} alt="image" />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>

        </div>
    );
};

export default Homepage;