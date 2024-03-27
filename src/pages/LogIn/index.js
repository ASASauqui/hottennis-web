import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';

function Login() {
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
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
                            <h1 className="my-3 text-3xl font-semibold text-gray-700">Sign in</h1>
                            <p className="text-gray-500">Sign in to access your account</p>
                        </div>
                        <div className="m-7">
                            <form onSubmit={handleSubmit}>
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
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                                        <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500">Forgot password?</a>
                                    </div>
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
                                    <button type="submit" className="btn btn-primary w-full bg-red-500">Sign in</button>
                                </div>
                                <p className="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/signup" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500">Sign Up</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
