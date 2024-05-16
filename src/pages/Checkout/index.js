import './index.css';
import { useEffect, useState } from 'react';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import { getProduct } from '../../services/products';
import { useAddresses } from '../../hooks/useAddresses';
import { createCheckoutSession } from '../../services/payments';
import { loadStripe } from '@stripe/stripe-js';
import { createOrder } from '../../services/orders';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

function Checkout() {
    const { user } = useAuth();
    const { shoppingCart, showShoppingCart, addItem, removeItem, setItemQuantity, emptyCart, setShowShoppingCart } = useShoppingCart();
    const { getAddressesProvider, removeAddressProvider, addresses } = useAddresses();
    const [products, setProducts] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

    useEffect(() => {
        if (shoppingCart == []) {
            return;
        }

        addresses && getSelectedAddress();

        fetchProducts();
        fetchAddresses();
    }, [shoppingCart]);

    useEffect(() => {
        addresses && getSelectedAddress();
    }, [addresses]);

    const getSelectedAddress = () => {
        let _selectedAddress = "";

        if (window.localStorage.getItem('selectedAddress')) {
            _selectedAddress = window.localStorage.getItem('selectedAddress');
        }
        if (addresses.length > 0 && _selectedAddress === "") {
            _selectedAddress = addresses[0]._id;
        }

        setSelectedAddress(_selectedAddress);
    }

    const makePayment = async () => {
        if (products.length === 0) {
            return;
        }

        try {

            let response = await createOrder(user.token, { products, address: selectedAddress });

            if (response.ok === false) {
                toast.error('Error al procesar el pago');
                return;
            }

            const order = await response.json();


            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

            response = await createCheckoutSession(user.token, products, order._id);
            const session = await response.json();

            if (response.ok === false) {
                toast.error('Error al procesar el pago');
                return;
            }

            const result = stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                toast.error('Error al procesar el pago');
            }

            emptyCart();
        } catch (error) {
            toast.error('Error al procesar el pago');
        }
    };



    const fetchAddresses = async () => {
        await getAddressesProvider();
    };


    const fetchProducts = async () => {
        const promises = shoppingCart.map(async (item) => {
            const response = await getProduct(item.id);
            const data = await response.json();

            if (response.ok) {
                return data;
            }
            return null;
        });

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

    return (
        <>
            <div className="container mx-auto mt-10">
                <div className="sm:flex shadow-md my-10">
                    <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Carrito de compras</h1>
                            {shoppingCart.reduce((acc, curr) => acc + curr.quantity, 0) > 0 && <h2 className="font-semibold text-2xl">{shoppingCart.reduce((acc, curr) => acc + curr.quantity, 0)} {shoppingCart.reduce((acc, curr) => acc + curr.quantity, 0) > 1 ? "Productos" : "Producto"}</h2>}
                        </div>

                        {
                            products.length > 0 ? products.map((item, index) => (
                                <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50" key={index}>
                                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                                        <img src={item.images[0]} alt="Black Leather Purse" className="h-full object-center object-cover md:block hidden" />
                                        <img src={item.images[0]} alt="Black Leather Purse" className="md:hidden w-full h-full object-center object-cover" />
                                    </div>
                                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{item.brand}</p>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-base font-black leading-none text-gray-800">{item.title}</p>
                                            <div className="flex flex-col items-start gap-2">
                                                <p className="text-xs leading-3 text-gray-800 font-semibold">Cantidad:</p>
                                                <input type="number" min="1" value={item.quantity}
                                                    onChange={(e) => handleOnChangeItemQuantity(item._id, e.target.value, item.size)}
                                                    className="w-16 h-8 border border-gray-300 rounded-md text-xs text-gray-800 text-center p-3" />
                                            </div>
                                        </div>
                                        <p className="text-xs leading-3 text-gray-600 pt-2">Talla: {item.size}</p>
                                        <div className="flex items-center justify-between pt-5">
                                            <div className="flex itemms-center">
                                                <p className="text-xs leading-3 underline text-red-500 cursor-pointer" onClick={() => removeItem(item._id, item.size)}>Eliminar</p>
                                            </div>
                                            <p className="text-base font-black leading-none text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : <h1 className="text-center text-2xl font-semibold mt-10">Tu carrito de compras está vacío</h1>
                        }
                    </div>
                    <div id="summary" className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Direcciones</h1>
                        <div className="flex flex-col mt-3">
                            {
                                addresses.length > 0 ? addresses.map((address, index) => (
                                    <div 
                                    className={`flex flex-col my-1 p-3 border w-full cursor-pointer ${selectedAddress === address._id ? 'border-indigo-500' : 'border-gray-200'}`} 
                                    onClick={() => setSelectedAddress(address._id)}
                                    key={index}>
                                        <p className="text-xs leading-3 text-gray-800 font-semibold">{address.name}</p>
                                        <p className="text-xs leading-3 text-gray-800">{address.street}</p>
                                        <p className="text-xs leading-3 text-gray-800">{address.city}, {address.state}, {address.zipCode}</p>
                                        <p className="text-xs leading-3 text-gray-800">{address.country}</p>
                                        <p className="text-xs leading-3 text-gray-800">{address.phone}</p>
                                    </div>
                                )) : (
                                    <div>
                                        <p className="text-xs leading-3 text-gray-800">No tienes direcciones registradas</p>
                                        <a href="/addresses" className="text-xs leading-3 text-red-500 underline">Agregar dirección</a>
                                    </div>
                                )
                            }
                            <a href="/addresses" className="text-xs leading-3 text-red-500 underline mt-3">Administrar direcciones</a>
                            <span className="text-xs leading-3 text-gray-800 font-semibold mt-3">Costo de envío: GRATUITO</span>
                        </div>
                            

                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total</span>
                                <span>{formatPrice(products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0))}</span>
                            </div>
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full disabled:opacity-50" disabled={products.length === 0 || selectedAddress === ""} onClick={makePayment}> 
                                Pagar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
