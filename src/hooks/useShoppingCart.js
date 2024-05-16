import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLocalStorage } from "./useLocalStorage";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useLocalStorage("shoppingCart", []);
    const [showShoppingCart, setShowShoppingCart] = useState(false);
    const navigate = useNavigate();

    // Call this function when you want to add an item to the shopping cart
    const addItem = (id, size) => {
        const item = shoppingCart.find((item) => item.id === id && item.size === size);

        if (item) {
            const newShoppingCart = shoppingCart.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });

            setShoppingCart(newShoppingCart);
        }
        else {
            const newShoppingCart = [...shoppingCart, { id: id, quantity: 1, size: size}];
            setShoppingCart(newShoppingCart);
        }
    };

    // Call this function when you want to remove an item from the shopping cart
    const removeItem = (id) => {
        const newShoppingCart = shoppingCart.filter((item) => item.id !== id);
        setShoppingCart(newShoppingCart);
    };

    const setItemQuantity = (id, quantity) => {
        const newShoppingCart = shoppingCart.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: quantity
                };
            }
            return item;
        });

        setShoppingCart(newShoppingCart);
    };

    // Call this function when you want to empty the shopping cart
    const emptyCart = () => {
        setShoppingCart([]);
    };

    // Call this function when you want to checkout
    const checkout = () => {
        if (shoppingCart.length === 0) {
            toast.error("Your shopping cart is empty");
        }
        else {
            navigate("/checkout");
        }
    };

    const value = useMemo(
        () => ({
            shoppingCart,
            showShoppingCart,
            addItem,
            removeItem,
            setItemQuantity,
            emptyCart,
            setShowShoppingCart
        }),
        [shoppingCart, showShoppingCart]
    );

    return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};
