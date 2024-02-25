import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "../../components/InputField";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
    const navigate = useNavigate();
    const validationSchema = yup.object({
        first_name: yup.string().required("First Name is required"),
        last_name: yup.string().required("First Name is required"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one symbol"
            )
            .required("Password is required"),
        confirm_password: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required(),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    `${BACKEND_URL}/auth/register`,
                    values
                );
                console.log(data);
                cookie.set("token", data.token);
                cookie.set("user", JSON.stringify(data.user));
                toast.success("Registration Successful");
                navigate("/");
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
                        Register
                    </h1>
                </div>
                <form
                    className='flex flex-col gap-5'
                    onSubmit={formik.handleSubmit}
                >
                    <div className='grid grid-cols-2 gap-3'>
                        <InputField
                            id='first_name'
                            type='text'
                            label='First Name'
                            placeholder='John Doe'
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.first_name &&
                                Boolean(formik.errors.first_name)
                            }
                            errorMessage={formik.errors.first_name}
                        />
                        <InputField
                            id='last_name'
                            type='text'
                            label='Last Name'
                            placeholder='John Doe'
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.last_name &&
                                Boolean(formik.errors.last_name)
                            }
                            errorMessage={formik.errors.last_name}
                        />
                        <InputField
                            className='col-span-2'
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
                        <InputField
                            id='confirm_password'
                            type='confirm_password'
                            label='confirm_password'
                            placeholder='******'
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.confirm_password &&
                                Boolean(formik.errors.confirm_password)
                            }
                            errorMessage={formik.errors.confirm_password}
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-800 text-white flex justify-center items-center py-2 rounded-md w-full hover:bg-blue-900'
                    >
                        {formik.isSubmitting ? (
                            <ThreeDots color='white' height={25} width={25} />
                        ) : (
                            "Register"
                        )}
                    </button>
                    <p className='text-center'>
                        Already have an account?{" "}
                        <Link to='/' className='text-blue-800'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
