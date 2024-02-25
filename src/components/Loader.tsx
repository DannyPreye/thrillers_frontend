import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <ThreeDots visible={true} height='80' width='80' color='#145DA0' />
        </div>
    );
};

export default Loader;
