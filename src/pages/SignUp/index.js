import './index.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register } from '../../services/users';

import CustomInput from '../../components/CustomInput';
import RippleButton from '../../components/Buttons/RippleButton';

function Signup() {
    const navigate = useNavigate();

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().required('Required').matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
            password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const response = await register(values);
            const data = await response.json();

            if (response.ok) {
                toast.success('Se ha registrado correctamente');
                localStorage.setItem('token', data.data.token);
                navigate('/');
            }
            else {
                toast.error('Error al registrarse');
            }
        }
    });

    return (
        <>
            <div className="flex items-center min-h-screen bg-white">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700">Registrarse</h1>
                            <p className="text-gray-500">Crea tu cuenta</p>
                        </div>
                        <div className="m-7">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                                <CustomInput label="Nombre" type="text" id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Nombre" />

                                <CustomInput label="Email" type="email" id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Email" />

                                <CustomInput label="Número de teléfono" type="tel" id="phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Número de teléfono" />

                                <CustomInput label="Contraseña" type="password" id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Contraseña" />

                                <div className="mb-6">
                                    <RippleButton type="submit" text="Registrarse" color="bg-primary" />
                                </div>
                                <p className="text-sm text-center text-gray-400">¿Ya tienes una cuenta? <a href="/login" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">Inicia sesión</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
