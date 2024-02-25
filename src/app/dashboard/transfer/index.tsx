import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import InputField from "../../../components/InputField";
import { ThreeDots } from "react-loader-spinner";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { AccounType } from "../../../types/accountType";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Transfer = () => {
    const { userData } = useContext(AuthContext);
    const [accountLoading, setAccountLoading] = useState(false);
    const [accountDetails, setAccountDetails] = useState<AccounType | null>();

    const fetchAccountDetails = async () => {
        try {
            //  setAccountError(false);
            setAccountLoading(true);
            const { data: res } = await axios.get(`${BACKEND_URL}/account/`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });

            setAccountDetails(res?.data);
        } catch (error) {
            //  setAccountError(true);
        } finally {
            setAccountLoading(false);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchAccountDetails();
        }
    }, [userData]);

    const validationSchema = Yup.object({
        amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be a positive number")
            .typeError("Invalid amount, please enter a number")
            .required("Amount is required"),
        description: Yup.string().required(
            "Transaction Description is required"
        ),
        account_number: Yup.string()
            .required("Account number is required")
            .matches(/^\d{1,10}$/, "Account number is a 10 digits number"),
    });
    const formik = useFormik({
        initialValues: {
            amount: "",
            description: "",
            account_number: "",
        },
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    `${BACKEND_URL}/transactions/transfer`,
                    { ...values },
                    {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    }
                );
                if (data) {
                    await fetchAccountDetails();
                    toast.success("Money transferred successfully");
                }
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
        <div className='w-full px-4'>
            <h1 className='text-2xl font-bold'>Transfer</h1>
            <div className='rounded-md w-full bg-blue-800 text-gray-200 p-4 flex gap-2'>
                <FaMoneyBillTrendUp size={30} />
                <div className='flex flex-col'>
                    <h3 className='font-bold'>Account Balance:</h3>
                    <p>
                        ₦
                        {accountLoading ? (
                            <ThreeDots width={20} height={20} />
                        ) : (
                            accountDetails?.balance
                        )}
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center mt-9'>
                <form
                    onSubmit={formik.handleSubmit}
                    className='lg:w-2/3 w-full border rounded-md p-5 '
                >
                    <h3 className='text-center text-xl font-montserrat font-semibold'>
                        Transfer Funds
                    </h3>
                    <div className='border-l-[10px] border-gray-300 my-4 bg-blue-400 p-3'>
                        N10 is deducted as the configuration fee
                    </div>
                    <div className='flex flex-col gap-4'>
                        <InputField
                            value={formik.values.account_number}
                            type='number'
                            label='Account Number'
                            placeholder='1234567899'
                            id='account_number'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={10}
                            isError={
                                formik.touched.account_number &&
                                Boolean(formik.errors.account_number)
                            }
                            errorMessage={formik.errors.account_number}
                        />
                        <InputField
                            value={formik.values.description}
                            type='text'
                            label='Description'
                            placeholder='Sending money to a friend'
                            id='description'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            errorMessage={formik.errors.description}
                        />
                        <InputField
                            value={formik.values.amount}
                            type='amount'
                            label='Amount'
                            placeholder='500'
                            id='amount'
                            onChange={(value) => {
                                formik.setFieldValue(
                                    "amount",
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    value.floatValue || ""
                                );
                            }}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.amount &&
                                Boolean(formik.errors.amount)
                            }
                            errorMessage={formik.errors.amount}
                        />
                        <button
                            type='submit'
                            className='bg-blue-800 text-white flex justify-center items-center py-2 rounded-md w-full hover:bg-blue-900'
                        >
                            {formik.isSubmitting ? (
                                <ThreeDots
                                    color='white'
                                    height={25}
                                    width={25}
                                />
                            ) : (
                                "Send"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Transfer;
