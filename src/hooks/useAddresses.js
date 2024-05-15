import { createContext, useContext, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "./useAuth";
import { getAddresses, createAddress, deleteAddress } from "../services/addresses";

const AddressesContext = createContext();

export const AddressesProvider = ({ children }) => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState(false);

    const createAddressProvider = async (address) => {
        try {
            const response = await createAddress(user.token, address);
            const data = await response.json();

            if (!response.ok) {
                toast.error("Error al agregar la dirección");
                return;
            }

            setAddresses([...addresses, data]);
            toast.success("Dirección agregada correctamente");
        }
        catch (error) {
            toast.error("Error al agregar la dirección");
        }
    };

    const removeAddressProvider = async (id) => {
        try {
            const response = await deleteAddress(user.token, id);

            if (!response.ok) {
                toast.error("Error al borrar la dirección");
                return;
            }

            const newAddresses = addresses.filter((a) => a._id !== id);

            setAddresses(newAddresses);

            toast.success("Dirección borrada correctamente");
        }
        catch (error) {
            toast.error("Error al borrar la dirección");
        }
    };

    const getAddressesProvider = async () => {
        try {
            const response = await getAddresses(user.token);
            const data = await response.json();

            if (!response.ok) {
                toast.error("Error al obtener las direcciones");
            }

            setAddresses(data);
        }
        catch (error) {
            toast.error("Error al obtener las direcciones");
        }
    };

    const value = useMemo(
        () => ({
            addresses,
            setAddresses,
            createAddressProvider,
            removeAddressProvider,
            getAddressesProvider
        }),
        [addresses]
    );

    return <AddressesContext.Provider value={value}>{children}</AddressesContext.Provider>;
};

export const useAddresses = () => {
    return useContext(AddressesContext);
};
