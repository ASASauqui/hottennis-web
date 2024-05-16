import React from 'react';
import './index.css';

const translations = {
    'not processed': 'No procesado',
    'processing': 'Procesando',
    'shipped': 'Enviado',
    'delivered': 'Entregado',
    'cancelled': 'Cancelado'
};


const OrderModal = ({ action, order, setShowOrderModal }) => {
    console.log(order);

    const handleCloseModal = () => {
        setShowOrderModal(false);
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={handleCloseModal}>
                <div className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white overflow-x-hidden h-auto max-h-screen rounded-md"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end">
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold text-gray-800">Orden</h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-500">ID: {order._id}</p>
                                <p className="text-gray-500">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-500">Total: {formatPrice(order.amount)}</p>
                                <p className="text-gray-500">Estado: {translations[order.status.toLowerCase()]}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold text-gray-800">Dirección de envío</h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-500">Nombre: {order.address.name}</p>
                                <p className="text-gray-500">Dirección: {order.address.address}</p>
                                <p className="text-gray-500">Ciudad: {order.address.city}</p>
                                <p className="text-gray-500">Estado: {order.address.state}</p>
                                <p className="text-gray-500">Código Postal: {order.address.zip}</p>
                                <p className="text-gray-500">País: {order.address.country}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
                            <div className="flex flex-col gap-2">
                                {order.products.map((product, index) => (
                                    <div key={index} className="flex flex gap-2 shadow-sm p-2">
                                        <div className="flex justify-center items-center mx-3">
                                            <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-gray-500">Nombre: {product.title} ({product.size})</p>
                                            <p className="text-gray-500">Cantidad: {product.quantity}</p>
                                            <p className="text-gray-500">Precio: {product.price}</p>
                                        </div>
                
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default OrderModal;
