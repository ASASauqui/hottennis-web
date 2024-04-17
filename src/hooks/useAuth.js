import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLocalStorage } from "./useLocalStorage";

import { login, register, getUserInfo } from '../services/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // Call this function when you want to authenticate the user
    const loginUser = async (values) => {
        const loginResponse = await login(values);
        const loginData = await loginResponse.json();

        const userInfoResponse = await getUserInfo(loginData.data.token);
        const userInfoData = await userInfoResponse.json();

        console.log(userInfoData);

        if (loginResponse.ok) {
            toast.success('Se ha iniciado sesión correctamente');
            setUser({token: loginData.data.token, user: userInfoData});
            navigate("/");
        }
        else {
            toast.error('Error al iniciar sesión');
        }
    };

    // Call this function to register a new user
    const registerUser = async (values) => {
        const registerResponse = await register(values);
        const registerData = await registerResponse.json();

        if (registerResponse.ok) {
            toast.success('Se ha registrado correctamente');
            navigate("/login");
        }
        else {
            toast.error('Error al registrar');
        }
    };

    const updateUser = async () => {
        const userInfoResponse = await getUserInfo(user.token);
        const userInfoData = await userInfoResponse.json();

        if (userInfoResponse.ok) {
            setUser({token: user.token, user: userInfoData});
        }
        else {
            toast.error('Error al actualizar la información del usuario');
        }
    };

    // Call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        toast.success('Se ha cerrado sesión correctamente');
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            loginUser,
            registerUser,
            updateUser,
            logout,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
