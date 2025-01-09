import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AxiosHandler from '../handlers/AxiosHandler';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import ViewItemModal from '../components/ViewItemModal';

const Homepage = () => {

    const axiosHandler = new AxiosHandler('http://localhost:5000');

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // Products displayed after filtering
    const [search, setSearch] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

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

    const handleDelete = async (id) => {
        try {
            await axiosHandler.handlePostRequest(`/delete-item`, {
                collection: "inventory",
                item_id: id,
            });
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product.");
        }
    };

    return (
        <div>
            <h1>Shop Manager</h1>
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
            <button className="btn" onClick={() => {navigate('/login');}}>Login</button>

            <div className='product-container'>
            {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.thumbnail} alt="image" />
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <div className="product-buttons">
                                <button>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                                <button onClick={() => {openModal(); setSelectedItem(product);}}>View</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>

            <ViewItemModal isOpen={isModalOpen} onClose={closeModal}>
                {selectedItem && (
                <div>
                    <h2>{selectedItem.name}</h2>
                    <p>{selectedItem.description}</p>
                </div>
                )}
            </ViewItemModal>

        </div>
    );
};

export default Homepage;