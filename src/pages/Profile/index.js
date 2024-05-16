import './index.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { updateUserInfo } from '../../services/users';

import CustomInput from '../../components/CustomInput';
import RippleButton from '../../components/Buttons/RippleButton';

import ImageCover from '../../assets/images/tennis_cover_2.webp';

import { updatePassword } from '../../services/users';

function Profile() {
    const { user, updateUser } = useAuth();

    const formikDetails = useFormik({
        initialValues: {
            name: user.user.name,
            email: user.user.email,
            phone: user.user.phone,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            email: Yup.string().email('Email inválido').required('Requerido'),
            phone: Yup.string().required('Requerido').matches(/^[0-9]+$/, 'Deben ser solo dígitos').min(10, 'El número de teléfono debe tener al menos 10 dígitos').max(10, 'El número de teléfono debe tener como máximo 10 dígitos'),
        }),
        onSubmit: async (values) => {
            if (values.name === user.user.name && values.email === user.user.email && values.phone === user.user.phone) {
                toast.info('No hay cambios para actualizar');
                return;
            }

            const response = await updateUserInfo(user.token, values);
            const data = await response.json();

            if (response.ok) {
                toast.success('Información actualizada correctamente');
                updateUser();
            }
            else {
                toast.error('Error al actualizar la información');
            }
        },
    });

    const formikPassword = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Requerido'),
            newPassword: Yup.string().required('Requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
            confirmPassword: Yup.string().required('Requerido').oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
        }),
        onSubmit: async (values) => {
            if (values.currentPassword === values.newPassword) {
                toast.error('La nueva contraseña debe ser diferente a la actual');
                return;
            }

            // regex to validate password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

            if (!passwordRegex.test(values.newPassword)) {
                toast.error('La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número');
                return;
            }

            const response = await updatePassword(user.token, values);


            if (response.ok) {
                toast.success('Contraseña actualizada correctamente');
                formikPassword.resetForm();
            }
            else {
                toast.error('Error al actualizar la contraseña');
            }

        },
    });

    const formatPhone = (phone) => {
        return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
    };

    return (
        <>
            <div className="w-full mx-auto bg-white">
                <img src={ImageCover} alt="User Cover"
                    className="w-full h-[20rem] object-cover object-center" />
                <div className="w-full mx-auto flex justify-center">
                    {user && user.user.profileImage ? (
                        <img src={user.user.profileImage}
                            alt="User Profile"
                            className="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem] bottom-[4rem]" />
                    ) : (
                        <span
                            className="flex items-center justify-center bg-neutral-200 text-neutral-600 rounded-full xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem] bottom-[4rem]">
                            <span className="text-[5rem] font-semibold">{user.user.name.charAt(0)}</span>
                        </span>
                    )}
                </div>

                <div className="w-full mx-auto flex flex-col justify-center items-center -mt-10">
                    <h1 className="text-3xl font-bold">{user.user.name}</h1>
                    <p className="text-lg font-semibold text-neutral-500 mt-2">{user.user.email}</p>
                    <p className="text-lg font-semibold text-neutral-500 mt-2">+52 {formatPhone(user.user.phone)}</p>
                </div>


                <div className="flex flex-col justify-center items-center gap-20 p-10 mt-10">
                    <div className='md:w-1/2 md:flex-col sm:flex-col sm:w-full mx-auto flex justify-around items-center -mt-10'>
                        <a href='/orders' className="w-full flex justify-center items-center py-2 px-4 m-2 rounded-lg bg-primary border-2 text-center border-transparent text-white text-md font-bold hover:bg-primary-hover">Mis pedidos</a>
                        <a href='/addresses' className="w-full flex justify-center items-center py-2 px-4 m-2 rounded-lg bg-primary border-2 text-center border-transparent text-white text-md font-bold hover:bg-primary-hover">Mis direcciones</a>
                    </div>
                    <div className="w-full sm:w-[600px] md:w-[750px] flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold">Actualizar Detalles</h1>
                        <form onSubmit={formikDetails.handleSubmit} className="w-full flex flex-col gap-7 p-5 shadow-lg rounded-lg bg-white border border-gray-200">
                            <CustomInput label="Nombre" type="text" name="name" value={formikDetails.values.name} onChange={formikDetails.handleChange} onBlur={formikDetails.handleBlur} touched={formikDetails.touched} errors={formikDetails.errors} autoComplete="off" placeholder="Nombre" />
                            <CustomInput label="Email" type="email" name="email" value={formikDetails.values.email} onChange={formikDetails.handleChange} onBlur={formikDetails.handleBlur} touched={formikDetails.touched} errors={formikDetails.errors} autoComplete="off" placeholder="Email" />
                            <CustomInput label="Número de teléfono" type="tel" name="phone" value={formikDetails.values.phone} onChange={formikDetails.handleChange} onBlur={formikDetails.handleBlur} touched={formikDetails.touched} errors={formikDetails.errors} autoComplete="off" placeholder="Número de teléfono" />
                            <RippleButton type="submit" text="Actualizar Detalles" color="bg-primary" />
                        </form>
                    </div>

                    <div className="w-full sm:w-[600px] md:w-[750px] flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold">Cambiar Contraseña</h1>
                        <form onSubmit={formikPassword.handleSubmit} className="w-full flex flex-col gap-7 p-5 shadow-lg rounded-lg bg-white  border border-gray-200">
                            <CustomInput label="Contraseña Actual" type="password" name="currentPassword" value={formikPassword.values.currentPassword} onChange={formikPassword.handleChange} onBlur={formikPassword.handleBlur} touched={formikPassword.touched} errors={formikPassword.errors} autoComplete="off" placeholder="Contraseña Actual" />
                            <CustomInput label="Nueva Contraseña" type="password" name="newPassword" value={formikPassword.values.newPassword} onChange={formikPassword.handleChange} onBlur={formikPassword.handleBlur} touched={formikPassword.touched} errors={formikPassword.errors} autoComplete="off" placeholder="Nueva Contraseña" />
                            <CustomInput label="Confirmar Contraseña" type="password" name="confirmPassword" value={formikPassword.values.confirmPassword} onChange={formikPassword.handleChange} onBlur={formikPassword.handleBlur} touched={formikPassword.touched} errors={formikPassword.errors} autoComplete="off" placeholder="Confirmar Contraseña" />
                            <RippleButton type="submit" text="Cambiar Contraseña" color="bg-primary" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
