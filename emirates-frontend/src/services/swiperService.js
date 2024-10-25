// src/services/swiperService.js

import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Replace with your actual API URL if different

export const fetchSwiper = async () => {
    try {
        // Ensure images are included in the response by using the populate parameter
        const response = await axios.get(`${API_URL}/swipers?populate=imagem_carrossel1
            &populate=imagem_carrossel2&populate=imagem_carrossel3&populate=imagem_banner
            &populate=imagem_about`);

        // console.log("API Response:", response.data); // Log the entire response

        return response.data.data; // Return the array of listings directly
    } catch (error) {
        console.error('Error fetching listings:', error);
        return []; // Handle the error by returning an empty array or by other means
    }
};
