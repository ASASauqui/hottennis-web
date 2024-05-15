export const createCheckoutSession = async (token, products) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({products: products})
    });
};
