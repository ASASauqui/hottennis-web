import './index.css';

import React, { useEffect, useState } from 'react';
import { useAddresses } from '../../hooks/useAddresses';

import AddressModal from '../../components/Modals/AddressModal';
import RippleButton from '../../components/Buttons/RippleButton';

function Addresses() {
    const { getAddressesProvider, removeAddressProvider, addresses } = useAddresses();
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleDeleteAddress = async (address) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            return;
        }

        await removeAddressProvider(address._id);
    };

    useEffect(() => {
        const fetchAddresses = async () => {
            await getAddressesProvider();
        };

        fetchAddresses();
    }, []);

    return (
        <>
            <div className='min-h-screen flex flex-col bg-slate-100 px-5 md:px-20 py-10 gap-5'>
                <div className="flex flex-col bg-white border border-gray-200 rounded-md px-5 py-10">
                    {/* Header */}
                    <div className='w-full'>
                        <div className="flex flex-col sm:flex-row justify-between">
                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-800">Direcciones registradas</h1>

                            {/* Add address */}
                            <div className="flex justify-center items-center">
                                <RippleButton
                                    text="Agregar"
                                    color="bg-primary"
                                    textColor="text-white"
                                    emoji="➕"
                                    onClick={() => { setShowAddressModal(true); setSelectedAddress(null); }}

                                />
                            </div>
                        </div>
                        <hr className="my-5" />
                    </div>

                    {/* No addresses */}
                    {addresses.length === 0 && (
                        <div className="flex justify-center items-center">
                            <p className="text-gray-500">Direcciones no encontradas</p>
                        </div>
                    )}

                    {/* Addresses */}
                    {addresses.length > 0 && (
                        <div className='overflow-x-auto'>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Dirección
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Ciudad
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Estado
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            País
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Código Postal
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Teléfono
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Rows */}
                                    {addresses.map((address, index) => (
                                        <tr key={index} className='hover:bg-gray-100'>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.city}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.state}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.country}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.zip}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {address.phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                                                <button className="text-red-600 hover:text-red-900"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address) }}>
                                                    Borrar
                                                </button>
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

            {/* Address Modal */}
            {showAddressModal && (
                <AddressModal action='add' user={selectedAddress} setShowAddressModal={setShowAddressModal} />
            )}
        </>
    );
}

export default Addresses;
