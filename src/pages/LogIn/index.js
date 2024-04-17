import './index.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

import CustomInput from '../../components/CustomInput';
import RippleButton from '../../components/Buttons/RippleButton';

function Login() {
    const { authenticateUser } = useAuth();

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, } = useFormik({
        initialValues: {
            phone: '',
            password: ''
        },
        validationSchema: Yup.object({
            phone: Yup.string().required('Required').matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
            password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: async (values) => {
            await authenticateUser(values)
        }
    });

    return (
        <>
            <div className="flex items-center min-h-screen bg-white">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700">Iniciar Sesión</h1>
                            <p className="text-gray-500">Inicia sesión para acceder a tu cuenta</p>
                        </div>
                        <div className="m-7">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                                <CustomInput label="Número de teléfono" type="tel" id="phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Número de teléfono" />

                                <CustomInput label="Contraseña" type="password" id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} touched={touched} errors={errors} autoComplete="off" placeholder="Contraseña" />

                                <div className="mb-6">
                                    <RippleButton type="submit" text="Iniciar Sesión" color="bg-primary" />
                                </div>
                                <p className="text-sm text-center text-gray-400">¿Aún no tienes una cuenta? <a href="/signup" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">Regístrate</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
