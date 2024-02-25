import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "../../components/InputField";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();
    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    `${BACKEND_URL}/auth/login`,
                    values
                );

                cookie.set("token", data.token);
                cookie.set("user", JSON.stringify(data.user));
                navigate("/dashboard");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("Something went wrong");
                    console.log(error);
                }
            }
        },
        validationSchema,
    });

    return (
        <div className='flex justify-center items-center h-screen font-lato p-4'>
            <div className=' md:w-1/3 w-full border-2 p-6 rounded-md flex flex-col gap-5 '>
                <div>
                    <h3 className='text-blue-800 text-lg text-center font-dancing-script font-semibold'>
                        Thrillers
                    </h3>
                    <h1 className='text-xl text-gray-500 font-bold font-montserrat text-center'>
                        Login
                    </h1>
                </div>
                <form
                    className='flex flex-col gap-5'
                    onSubmit={formik.handleSubmit}
                >
                    <div className='flex flex-col gap-3'>
                        <InputField
                            id='email'
                            type='email'
                            label='Email'
                            placeholder='johndoe@gmail.com'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            errorMessage={formik.errors.email}
                        />
                        <InputField
                            id='password'
                            type='password'
                            label='Password'
                            placeholder='******'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            errorMessage={formik.errors.password}
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-800 text-white flex justify-center items-center py-2 rounded-md w-full hover:bg-blue-900'
                    >
                        {formik.isSubmitting ? (
                            <ThreeDots color='white' height={25} width={25} />
                        ) : (
                            "Login"
                        )}
                    </button>
                    <p className='text-center'>
                        Don't have an account?{" "}
                        <NavLink to='/register' className='text-blue-800'>
                            Register
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
