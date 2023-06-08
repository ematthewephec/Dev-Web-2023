import React, {useEffect, useState} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './AdminPage.css';
import { USER_URL, ORDER_URL, PRODUCT_URL } from '../../components/utils/Constants';
import AdminUserList from '../../components/AdminList/AdminUserList';
import AdminOrderList from '../../components/AdminList/AdminOrderList';
import AdminProductList from '../../components/AdminList/AdminProductList';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

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

    const getProducts = async () => {
        fetch(`${PRODUCT_URL}`)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data);
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

    const modifyProduct = () =>{}

    const deleteProduct = async(productId) => {
        fetch(`${PRODUCT_URL}/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(() => {
            getProducts();
        })
    }
    
    useEffect(() => {
        getUsers();
        getOrders();
        getProducts();
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
                <Tab eventKey="products" onClick={getProducts} title="Products">
                    <AdminProductList
                        products={products}
                        modifyProduct={modifyProduct}
                        deleteProduct={deleteProduct}
                    />
                </Tab>   
            </Tabs>
        </>
    )
}

export default AdminPage;