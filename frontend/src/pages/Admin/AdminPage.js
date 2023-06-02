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
                <Tab eventKey="users" title="Users">
                    <AdminUserList
                        users={users}
                    />
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <AdminOrderList
                        orders={orders}
                    />
                </Tab>  
            </Tabs>
        </>
    )
}

export default AdminPage;