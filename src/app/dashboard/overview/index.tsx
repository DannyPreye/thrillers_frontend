import React, { useContext, useEffect, useState } from "react";
import { MdAccountBalance } from "react-icons/md";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { AccounType } from "../../../types/accountType";
import { AiOutlineAccountBook } from "react-icons/ai";
import { TransactionType } from "../../../types/transactionType";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Overview = () => {
    const { userData } = useContext(AuthContext);
    const [accountDetails, setAccountDetails] = useState<AccounType | null>();
    const [transactionLoading, setTransactionsLoading] = useState(false);

    const [accountError, setAccountError] = useState(false);
    const [transactionsError, setTransactionsError] = useState(false);

    const [accountLoading, setAccountLoading] = useState(false);
    const [transactions, setTransactions] = useState<TransactionType[] | null>(
        null
    );

    const fetchAccountDetails = async () => {
        try {
            setAccountError(false);
            setAccountLoading(true);
            const { data: res } = await axios.get(`${BACKEND_URL}/account/`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });

            setAccountDetails(res?.data);
        } catch (error) {
            setAccountError(true);
        } finally {
            setAccountLoading(false);
        }
    };

    const fetchTransactions = async () => {
        try {
            setAccountError(false);
            setTransactionsLoading(true);
            const { data: res } = await axios.get(
                `${BACKEND_URL}/transactions/`,
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );

            setTransactions(res?.data);
        } catch (error) {
            setTransactionsError(true);
        } finally {
            setTransactionsLoading(false);
        }
    };

    console.log(accountError);
    console.log(transactionsError);

    useEffect(() => {
        if (userData) {
            fetchAccountDetails();
            fetchTransactions();
        }
    }, [userData]);

    return (
        <div className='font-lato'>
            <h1 className='text-2xl font-bold'>Overview</h1>
            <div className='w-full mt-2 flex items-center justify-between bg-gray-300 rounded-md p-4'>
                <MdAccountBalance size={30} />
                <div>
                    <h2 className='text-xl font-bold '>
                        <span className='text-gray-500'> Welcome</span>{" "}
                        {userData?.first_name} {userData?.last_name}
                    </h2>
                    <p>{}</p>
                </div>
            </div>

            <div className='flex flex-wrap lg:flex-nowrap gap-4 justify-between mt-3'>
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
                <div className='rounded-md w-full bg-blue-800 text-white p-4 flex gap-2'>
                    <AiOutlineAccountBook size={30} />
                    <div className='flex flex-col'>
                        <h3 className='font-bold'>Account Number:</h3>
                        <p>
                            {accountLoading ? (
                                <ThreeDots width={20} height={20} />
                            ) : (
                                accountDetails?.account_number
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-7 overflow-x-auto bg-gray-300 p-4 rounded-md text-lg font-bold'>
                <h2>Transaction History</h2>
                <table className=' mt-5 striped-table rounded-md'>
                    <thead>
                        <tr className='bg-blue-800 text-base text-white'>
                            <th>Description</th>
                            <th>Sender</th>
                            <th>Reciever</th>
                            <th>Amount</th>
                            <th>Transaction Fee</th>
                            <th>Transaction Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {transactions && (
                        <>
                            {!transactionLoading &&
                                transactions?.length > 0 && (
                                    <tbody className='font-normal text-sm'>
                                        {transactions?.map((transaction) => (
                                            <tr
                                                className='text-center py-4 '
                                                key={transaction?._id}
                                            >
                                                <td>
                                                    {transaction?.description}
                                                </td>
                                                <td>
                                                    {transaction.type ==
                                                        "credit" && (
                                                        <span>
                                                            {
                                                                transaction
                                                                    ?.sender_or_reciever
                                                                    ?.first_name
                                                            }{" "}
                                                            {
                                                                transaction
                                                                    ?.sender_or_reciever
                                                                    ?.last_name
                                                            }
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {transaction.type ==
                                                        "debit" && (
                                                        <span>
                                                            {
                                                                transaction
                                                                    ?.sender_or_reciever
                                                                    ?.first_name
                                                            }{" "}
                                                            {
                                                                transaction
                                                                    ?.sender_or_reciever
                                                                    ?.last_name
                                                            }
                                                        </span>
                                                    )}
                                                </td>
                                                <td>₦{transaction?.amount}</td>
                                                <td>
                                                    ₦
                                                    {
                                                        transaction?.transaction_fee
                                                    }
                                                </td>

                                                <td>
                                                    <span
                                                        className={` ${
                                                            transaction.type ===
                                                            "credit"
                                                                ? " text-green-900"
                                                                : "text-red-900"
                                                        }`}
                                                    >
                                                        {transaction?.type}
                                                    </span>
                                                </td>

                                                <td>
                                                    {moment(
                                                        transaction?.date
                                                    ).format("Do MMM, yyyy")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                        </>
                    )}
                </table>
                {transactions && (
                    <>
                        {!transactionLoading && transactions?.length === 0 && (
                            <div className='h-[30vh] flex flex-col items-center justify-center'>
                                No transactions yet
                            </div>
                        )}
                    </>
                )}
                {transactionLoading && (
                    <div className='h-[30vh] flex flex-col items-center justify-center'>
                        <ThreeDots width={40} height={40} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Overview;
