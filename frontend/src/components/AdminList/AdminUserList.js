import React from 'react';
import { Button, ListGroup, Col, Row } from 'react-bootstrap';

function AdminUserList(props) {
    const users = props.users.map((user) => 
        <ListGroup.Item key={user.UserID}>
            <Row>
                <Col>{user.UserName}</Col>
                <Col>{user.UserEmail}</Col>
                <Col>{user.CreationDate}</Col>
                <Col>
                    {user.DeletionDate === null ?
                    <Button 
                        onClick={() => props.deleteUser(user.UserID)}
                    >
                        Delete User
                    </Button>
                    : <Button>Deleted</Button>}
                </Col>
            </Row>
        </ListGroup.Item>
    );
    
    return(
        <>
            {props.users.length > 0 ? (
                <ListGroup>
                    {users}
                </ListGroup>
            ) : (
                <p>No users registered on website!</p>
            )}
        </>
    )
}

export default AdminUserList;