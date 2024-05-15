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
        try {
            const loginResponse = await login(values);
            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                toast.error('Error al iniciar sesión');
                return;
            }

            const userInfoResponse = await getUserInfo(loginData.data.token);
            const userInfoData = await userInfoResponse.json();

            if (!userInfoResponse.ok) {
                toast.error('Error al iniciar sesión');
                return;
            }

            toast.success('Se ha iniciado sesión correctamente');
            setUser({ token: loginData.data.token, user: userInfoData });
            navigate("/");
        }
        catch (error) {
            toast.error('Error al iniciar sesión');
        }
    };

    // Call this function to register a new user
    const registerUser = async (values) => {
        try {
            const registerResponse = await register(values);
            const registerData = await registerResponse.json();

            if (!registerResponse.ok) {
                toast.error('Error al registrar');
                return;
            }

            toast.success('Se ha registrado correctamente');
            navigate("/login");
        }
        catch (error) {
            toast.error('Error al registrar');
        }
    };

    const updateUser = async () => {
        try {
            const userInfoResponse = await getUserInfo(user.token);
            const userInfoData = await userInfoResponse.json();

            if (!userInfoResponse.ok) {
                toast.error('Error al actualizar la información del usuario');
                return;
            }

            setUser({ token: user.token, user: userInfoData });
        }
        catch (error) {
            toast.error('Error al actualizar la información del usuario');
        }
    };

    // Call this function to sign out logged in user
    const logout = () => {
        try {

            setUser(null);
            toast.success('Se ha cerrado sesión correctamente');
            navigate("/login", { replace: true });
        }
        catch (error) {
            toast.error('Error al cerrar sesión');
        }
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
