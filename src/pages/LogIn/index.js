import './index.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

import CustomInput from '../../components/CustomInput';
import RippleButton from '../../components/Buttons/RippleButton';

function Login() {
    const { loginUser } = useAuth();

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, } = useFormik({
        initialValues: {
            phone: '',
            password: ''
        },
        validationSchema: Yup.object({
            phone: Yup.string().required('Requerido').matches(/^[0-9]+$/, 'Deben ser solo dígitos').min(10, 'El número de teléfono debe tener al menos 10 dígitos').max(10, 'El número de teléfono debe tener como máximo 10 dígitos'),
            password: Yup.string().required('Requerido').min(8, 'La contraseña debe tener al menos 8 caracteres'),
        }),
        onSubmit: async (values) => {
            await loginUser(values)
        }
    });

    return (
        <>
            <div className="flex items-center min-h-screen bg-gray-200">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700">Iniciar Sesión</h1>
                            <p className="text-gray-500">Inicia sesión para acceder a tu cuenta</p>
                        </div>
                        <div className="my-7">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-10 bg-white rounded-lg border border-gray-200 shadow-sm p-8'>
                                <CustomInput label="Número de teléfono" type="tel" id="phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Número de teléfono" />

                                <CustomInput label="Contraseña" type="password" id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Contraseña" />

                                <div className="mb-6">
                                    <RippleButton type="submit" text="Iniciar Sesión" color="bg-primary" />
                                    <p className="text-sm text-center text-gray-400 mt-5">¿Aún no tienes una cuenta? <a href="/signup" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">Regístrate</a>.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
