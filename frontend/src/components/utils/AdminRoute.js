import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar.js';

const AdminRoute = () => {
    return(
        <>
            <AdminNavbar />
            <Outlet />
        </>
    )
}

export default AdminRoute;