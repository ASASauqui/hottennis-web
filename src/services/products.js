export const getProducts = async () => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    });
};

export const getProduct = async (id) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    });
};
