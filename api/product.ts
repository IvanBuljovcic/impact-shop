const API_ENDPOINT = "https://fakestoreapi.com"; // TOOD: add this to an .env file to read from

export const getAllProducts = () => fetch(`${API_ENDPOINT}/products`);
