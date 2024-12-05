import axios from 'axios';

class AxiosHandler {
    constructor(apiLink) {
        this.apiLink = apiLink;
    }

    handleGetRequest = async (tailLink) => {
        try {
            const response = await axios.get(`${this.apiLink}${tailLink}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    handlePostRequest = async (tailLink, payload) => {
        try {
            const response = await axios.post(`${this.apiLink}${tailLink}`, payload);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    };
}

export default AxiosHandler;
