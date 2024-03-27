import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';

function Signup() {
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: ({ email, password }) => {
            alert(`Email: ${email}, Password: ${password}`);
        }
    });

    return (
        <>
            <div className="flex items-center min-h-screen bg-white">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700">Sign up</h1>
                            <p className="text-gray-500">Create your account</p>
                        </div>
                        <div className="m-7">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600">First Name</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={"form-control" + (touched.firstName && errors.firstName ? " is-invalid" : "") + (touched.firstName && !errors.firstName ? " is-valid" : "")}
                                        required />
                                    {touched.firstName && !errors.firstName ? (
                                        <div className="valid-feedback">Looks good!</div>
                                    ) : null}
                                    {touched.firstName && errors.firstName ? (
                                        <div className="invalid-feedback">{errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600">Last Name</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={"form-control" + (touched.lastName && errors.lastName ? " is-invalid" : "") + (touched.lastName && !errors.lastName ? " is-valid" : "")}
                                        required />
                                    {touched.lastName && !errors.lastName ? (
                                        <div className="valid-feedback">Looks good!</div>
                                    ) : null}
                                    {touched.lastName && errors.lastName ? (
                                        <div className="invalid-feedback">{errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={"form-control" + (touched.email && errors.email ? " is-invalid" : "") + (touched.email && !errors.email ? " is-valid" : "")}
                                        required />
                                    {touched.email && !errors.email ? (
                                        <div className="valid-feedback">Looks good!</div>
                                    ) : null}
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="text-sm text-gray-600">New Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={"form-control" + (touched.password && errors.password ? " is-invalid" : "") + (touched.password && !errors.password ? " is-valid" : "")}
                                        required />
                                    {touched.password && !errors.password ? (
                                        <div className="valid-feedback">Looks good!</div>
                                    ) : null}
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <button type="submit" className="btn btn-primary w-full bg-red-500">Sign Up</button>
                                </div>
                                {/* <p className="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#!" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">Sign up</a>.</p> */}
                                <p className="text-sm text-center text-gray-400">You have an account? <a href="/login" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">Login</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
