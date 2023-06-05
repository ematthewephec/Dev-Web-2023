import React, {useEffect, useState} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './AdminPage.css';
import { USER_URL, ORDER_URL } from '../../components/utils/Constants';
import AdminUserList from '../../components/AdminList/AdminUserList';
import AdminOrderList from '../../components/AdminList/AdminOrderList';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    const getUsers = async () => {
        fetch(`${USER_URL}`)
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
            return;
        })
    }

    const getOrders = async () => {
        fetch(`${ORDER_URL}`)
        .then((response) => response.json())
        .then((data) => {
            setOrders(data);
            return;
        })
    }

    const deleteUser = async (userId) => {
        fetch(`${USER_URL}/${userId}/delete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(() => {
            getUsers();
        })
    };

    const cancelOrder = async(orderId) => {
        fetch(`${ORDER_URL}/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(() => {
            getOrders();
        })
    };
    
    useEffect(() => {
        getUsers();
        getOrders();
    }, []);

    return(
        <>
            <Tabs
                defaultActiveKey="users"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="users" onClick={getUsers} title="Users">
                    <AdminUserList
                        users={users}
                        deleteUser={deleteUser}
                    />
                </Tab>
                <Tab eventKey="orders" onClick={getOrders} title="Orders">
                    <AdminOrderList
                        orders={orders}
                        cancelOrder={cancelOrder}
                    />
                </Tab>  
            </Tabs>
        </>
    )
}

export default AdminPage;