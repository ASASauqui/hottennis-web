export const getAddresses = async (token) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const createAddress = async (token, address) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(address)
    });
};

export const deleteAddress = async (token, id) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/addresses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};
