import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { RiMenuFill } from "react-icons/ri";

interface HeaderProps {
    handleSideBar: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleSideBar }) => {
    const { userData } = useContext(AuthContext);
    return (
        <div className='px-4 py-2 w-full bg-gray-200 flex justify-between lg:justify-end items-center'>
            <div className='lg:hidden'>
                <RiMenuFill
                    className='text-2xl cursor-pointer'
                    onClick={handleSideBar}
                />
            </div>
            <div className='flex '>
                <div className='w-10 h-10 rounded-full font-bold font-montserrat grid place-items-center text-white bg-gray-400'>
                    {userData?.first_name[0]}
                    {userData?.last_name[0]}
                </div>
                <div className='ml-2'>
                    <p className='text-sm font-bold font-montserrat'>
                        {userData?.first_name} {userData?.last_name}
                    </p>
                    <p className='text-xs font-montserrat'>{userData?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
