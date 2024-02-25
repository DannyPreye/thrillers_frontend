import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Route, Routes } from "react-router";
import Overview from "../dashboard/overview";
import Transfer from "../dashboard/transfer";

const DashboardRoutes = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const handleSideBar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className='flex'>
            <Sidebar handleClose={handleSideBar} open={sidebarOpen} />
            <div className='w-full lg:w-4/5'>
                <Header handleSideBar={handleSideBar} />
                <div className='p-4'>
                    <Routes>
                        <Route path='/' element={<Overview />} />
                        <Route path='/transfer' element={<Transfer />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardRoutes;
