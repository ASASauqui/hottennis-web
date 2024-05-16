export const createOrder = async (token, order) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
    });
}

export const updateOrderStatus = async (token, order_id, status) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${order_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({status})
    });
}

export const getOrders = async (token) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
}