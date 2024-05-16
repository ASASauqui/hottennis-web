import './index.css';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import { toast } from 'react-toastify';
import { getProduct } from '../../services/products';
import { createCheckoutSession } from '../../services/payments';
import RippleButton from '../../components/Buttons/RippleButton';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
    const { user } = useAuth();
    const { shoppingCart, showShoppingCart, addItem, removeItem, setItemQuantity, emptyCart, setShowShoppingCart } = useShoppingCart();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getTotalPrice = () => {
        if (products.length === 0 || shoppingCart.length === 0) {
            return 0;
        }

        return products.reduce((total, product, index) => {
            return total + product.price * product.quantity;
        }, 0);
    };

    const handleOnChangeItemQuantity = (id, quantity, size) => {
        quantity = parseInt(quantity, 10)

        setItemQuantity(id, quantity, size)
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    // const makePayment = async () => {
    //     if (products.length === 0) {
    //         return;
    //     }

    //     try {
    //         const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    //         const response = await createCheckoutSession(user.token, products);
    //         const session = await response.json();

    //         if (response.ok === false) {
    //             toast.error('Error al procesar el pago');
    //             return;
    //         }

    //         const result = stripe.redirectToCheckout({
    //             sessionId: session.id,
    //         });

    //         if (result.error) {
    //             toast.error('Error al procesar el pago');
    //         }

    //         emptyCart();
    //     } catch (error) {
    //         toast.error('Error al procesar el pago');
    //     }
    // };

    const redirectToCheckout = async () => {
        if (products.length === 0) {
            return;
        }

        setShowShoppingCart(false);
        navigate('/checkout');

    }


    useEffect(() => {
        if (shoppingCart == []) {
            return;
        }

        const fetchProducts = async () => {
            const promises = shoppingCart.map(async (item) => {
                const response = await getProduct(item.id);
                const data = await response.json();

                if (response.ok) {
                    return data;
                }
                return null;
            });

            console.log(shoppingCart)

            var products = await Promise.all(promises);

            // Remove null values
            products = products.filter((product) => product !== null);

            // Add quantity to each product
            products = products.map((product, index) => {
                return {
                    ...product,
                    quantity: shoppingCart[index].quantity,
                    size: shoppingCart[index].size
                };
            });

            // Remove null values
            setProducts(products);
        };

        fetchProducts();
    }, [shoppingCart]);


    return (
        <>
            <div id="shopping-cart" className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">

                <div className="w-full absolute z-50 right-0 h-full overflow-y-auto overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700">
                    <div className="flex items-end lg:flex-row flex-col justify-end" id="cart">
                        <div className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white overflow-x-hidden lg:h-screen h-auto">
                            <button
                                type="button"
                                onClick={() => setShowShoppingCart(!showShoppingCart)}
                                className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                                <p className="text-sm pl-2 leading-none">Regresar</p>
                            </button>
                            <p className="lg:text-4xl text-3xl font-black leading-10 text-gray-800 pt-3">Carrito de compras</p>

                            {products.length === 0 ? (
                                <p className="text-sm text-gray-800 py-10">Tu carrito de compras está vacío</p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {products.map((item, index) => (
                                        <div
                                            key={"cart-item-" + index}
                                            className="md:flex items-strech py-8 md:py-10 lg:py-8 bg-slate-50 border border-gray-200 p-4 rounded-md">
                                            <div className="md:w-4/12 2xl:w-1/4 w-full">
                                                <img src={item.images[0] || "https://via.placeholder.com/150"}
                                                    alt={item.title}
                                                    className="h-full object-center object-cover md:block hidden" />
                                            </div>
                                            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-xs leading-3 text-gray-800 font-semibold">Nombre del producto:</span>
                                                    <p className="text-xs leading-3 text-gray-800">{item.title} ({item.size})</p>
                                                </div>
                                                <div className="flex flex-col gap-2 mt-4">
                                                    <span className="text-xs leading-3 text-gray-800 font-semibold">Marca:</span>
                                                    <p className="text-xs leading-3 text-gray-800">{item.brand}</p>
                                                </div>
                                                <div className="flex flex-col gap-2 mt-4">
                                                    <span className="text-xs leading-3 text-gray-800 font-semibold">Precio individual:</span>
                                                    <p className="text-xs leading-3 text-gray-800">{formatPrice(item.price)}</p>
                                                </div>

                                                <div className="flex items-center justify-between pt-5">

                                                    <div className="flex flex-col items-start gap-2">
                                                        <p className="text-xs leading-3 text-gray-800 font-semibold">Cantidad:</p>
                                                        <input type="number" min="1" value={item.quantity}
                                                            onChange={(e) => handleOnChangeItemQuantity(item._id, e.target.value, item.size)}
                                                            className="w-16 h-8 border border-gray-300 rounded-md text-xs text-gray-800 text-center p-3" />

                                                    </div>
                                                    <p className="self-end text-xs leading-3 text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                                                </div>

                                                <div className="flex items-center justify-between pt-5">
                                                    <div className="flex itemms-center">
                                                        <p
                                                            onClick={() => removeItem(item._id, item.size)}
                                                            className="text-xs leading-3 underline text-red-500 cursor-pointer">Remove</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Total Price */}
                            {products.length > 0 && (
                                <div className="flex items-center justify-end border-t border-gray-50 py-8 gap-3">
                                    <p className="text-xl leading-3 text-gray-800 font-semibold">Total:</p>
                                    <p className="text-lg leading-3 text-gray-800">{formatPrice(getTotalPrice())}</p>
                                </div>
                            )}

                            {products.length > 0 && (
                                <div className="flex items-center justify-between border-t border-gray-50 py-8 gap-10">
                                    <RippleButton text="Vaciar carrito" type="button" color="bg-red-500"
                                        onClick={() => emptyCart()}
                                        textColor="text-white" />
                                    <RippleButton text="Comprar" type="button" color="bg-black"
                                        onClick={() => redirectToCheckout()}
                                        textColor="text-white" />
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;
