export const register = async (body) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify(body)
    });
};

export const login = async (body) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify(body)
    });
};

export const checkToken = async (token) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/users/check-token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getUserInfo = async (token) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateUserInfo = async (token, body) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
};
