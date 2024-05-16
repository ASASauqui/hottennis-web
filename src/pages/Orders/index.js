import './index.css';

import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/orders';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import OrderModal from '../../components/Modals/OrderModal';


const colors = {
    'not processed': 'bg-gray-100 text-gray-800',
    'processing': 'bg-yellow-100 text-yellow-800',
    'shipped': 'bg-blue-100 text-blue-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-500 text-red-100'
};

const translations = {
    'not processed': 'No procesado',
    'processing': 'Procesando',
    'shipped': 'Enviado',
    'delivered': 'Entregado',
    'cancelled': 'Cancelado'
};



function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await getOrders(user.token);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setOrders(data);
        }

    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    }


    return (
        <>
            <div className='min-h-screen flex flex-col bg-slate-100 px-5 md:px-20 py-10 gap-5'>
                <div className="flex flex-col bg-white border border-gray-200 rounded-md px-5 py-10">
                    {/* Header */}
                    <div className='w-full'>
                        <div className="flex flex-col sm:flex-row justify-between">
                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-800">Mis órdenes</h1>

                        </div>
                        <hr className="my-5" />
                    </div>

                    {/* Addresses */}
                    {orders.length > 0 && (
                        <div className='overflow-x-auto'>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Total
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Estado
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Rows */}
                                    {orders.map((order, index) => (
                                        <tr key={index} className='hover:bg-gray-100 cursor-pointer' onClick={() => handleSelectOrder(order)}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order._id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatPrice(order.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[order.status.toLowerCase()]}`}>
                                                    {translations[order.status.toLowerCase()]}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>
            </div>

            {showOrderModal && (
                <OrderModal action='add' order={selectedOrder} setShowOrderModal={setShowOrderModal} />
            )}

        </>
    );
}

export default Orders;
