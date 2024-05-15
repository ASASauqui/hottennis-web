import React from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import CustomInput from '../../CustomInput';
import { useAuth } from '../../../hooks/useAuth';
import { useAddresses } from '../../../hooks/useAddresses';
import { createAddress } from '../../../services/addresses';

const AddressModal = ({ action, address, setShowAddressModal }) => {
    const { addresses, setAddresses } = useAddresses();
    const { user } = useAuth();
    const actionTitle = action === 'add' ? 'Agregar' : 'Editar';

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, } = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zip: '',
            phone: '',
            user: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            address: Yup.string().required('Requerido'),
            city: Yup.string().required('Requerido'),
            state: Yup.string().required('Requerido'),
            country: Yup.string().required('Requerido'),
            zip: Yup.string().required('Requerido').matches(/^[0-9]+$/, 'Deben ser solo dígitos').min(5, 'El código postal debe tener al menos 5 dígitos').max(5, 'El código postal debe tener como máximo 5 dígitos'),
            phone: Yup.string().required('Requerido').matches(/^[0-9]+$/, 'Deben ser solo dígitos').min(10, 'El número de teléfono debe tener al menos 10 dígitos').max(10, 'El número de teléfono debe tener como máximo 10 dígitos'),
        }),
        onSubmit: async (values) => {
            if (action === 'add') {
                const response = await createAddress(user.token, values);
                const data = await response.json();

                if (!response.ok) {
                    toast.error("Error al agregar la dirección");
                    return;
                }

                setShowAddressModal(false);

                setAddresses([...addresses, data]);

                toast.success("Dirección agregada correctamente");
            }
        }
    });

    const handleCloseModal = () => {
        setShowAddressModal(false);
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
                    <h1 className="text-3xl font-bold text-gray-800">{actionTitle} dirección</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-10 bg-white mt-10'>
                        <CustomInput label="Nombre" type="text" id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Nombre" />
                        <CustomInput label="Dirección" type="text" id="address" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Dirección" />
                        <CustomInput label="Ciudad" type="text" id="city" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Ciudad" />
                        <CustomInput label="Estado" type="text" id="state" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Estado" />
                        <CustomInput label="País" type="text" id="country" name="country" value={values.country} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="País" />
                        <CustomInput label="Código postal" type="text" id="zip" name="zip" value={values.zip} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Código postal" />
                        <CustomInput label="Teléfono" type="text" id="phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Teléfono" />

                        <div className="mb-6">
                            <button type="submit" className="bg-primary relative mx-auto min-w-[150px] w-full h-[50px] flex justify-center bg-gradient-to-br items-center rounded-[5px] cursor-pointer overflow-hidden transition duration-300 ease-out">
                                <div className="text-center text-[0.8rem] sm:text-[1rem] font-semibold mr-1 text-white">Guardar</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddressModal;
