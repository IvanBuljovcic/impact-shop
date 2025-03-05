const API_ENDPOINT = "https://fakestoreapi.com";

export const getAllProducts = () => fetch(`${API_ENDPOINT}/products`);
