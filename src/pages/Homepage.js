import React from 'react';
import axios from 'axios';

const Homepage = () => {

    const handleGetRequest = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostRequest = async () => {
        const payload = {
            key1: 'value1',
            key2: 'value2',
        };
        try {
            const response = await axios.post('http://localhost:5000/post', payload);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Shop Manager</h1>
            <button onClick={handleGetRequest}>GET Request</button>
            <button onClick={handlePostRequest}>POST Request</button>
        </div>
    );
};

export default Homepage;