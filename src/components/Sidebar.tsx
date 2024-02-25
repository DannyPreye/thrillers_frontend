import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { IoClose } from "react-icons/io5";

interface Props {
    open: boolean;
    handleClose: () => void;
}

const Sidebar: React.FC<Props> = ({ open, handleClose }) => {
    const { logout } = useContext(AuthContext);
    return (
        <div
            className={`w-3/5 lg:w-1/5 bg-blue-900 font-lato py-8 flex flex-col justify-between gap-3 ${
                open ? "left-0" : "-left-full"
            } duration-700 lg:left-0  h-screen fixed lg:sticky `}
        >
            <div className='flex items-center justify-between px-4 text-gray-200'>
                <h1 className=' py-5 text-2xl font-bold  font-dancing-script'>
                    Thrillers Account
                </h1>
                <IoClose
                    onClick={handleClose}
                    size={30}
                    className='lg:hidden cursor-pointer'
                />
            </div>
            <div className='flex flex-col gap-3 '>
                <NavLink
                    className={({ isActive }) =>
                        `flex px-4 py-2 items-center gap-2 text-gray-200 hover:bg-blue-700 rounded-r-md  ${
                            isActive
                                ? "focus:bg-blue-800 focus:text-white focus:border-l-[10px]"
                                : ""
                        } border-gray-200`
                    }
                    to={"/dashboard"}
                >
                    <RxDashboard /> <span> Dashboard</span>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `flex px-4 py-2 items-center gap-2 text-gray-200 hover:bg-blue-700 rounded-r-md  ${
                            isActive
                                ? "focus:bg-blue-800 focus:text-white focus:border-l-[10px]"
                                : ""
                        } border-gray-200`
                    }
                    to={"/dashboard/transfer"}
                >
                    <FaMoneyBillTransfer /> <span> Transfer</span>
                </NavLink>
            </div>
            <div className='flex flex-col gap-3 '>
                <div
                    onClick={logout}
                    className={`flex px-4 py-2 cursor-pointer items-center gap-2 text-gray-200 hover:bg-blue-700 rounded-r-md  focus:bg-blue-800 focus:text-white focus:border-l-[10px] border-gray-200`}
                >
                    <MdLogout /> <span> Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
