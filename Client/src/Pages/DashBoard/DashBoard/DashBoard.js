import React from 'react';
import useTitle from '../../../Hooks/useTitle';

const DashBoard = () => {
    useTitle('Dashboard')
    return (
        <div className='text-center'>
            <h2 className='font-bold text-3xl'>Welcome to Dashboard</h2>
        </div>
    );
};

export default DashBoard;