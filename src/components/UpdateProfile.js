import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password not matched');
        }

        const promisses = [];
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
            promisses.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promisses.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promisses).then(() => {
            history.push('/');
        }).catch(() => setError('Failed to update account')).finally(() => setLoading(false));


    };

    return (<div className="col-6 mx-auto py-3">
        <Card>
            <Card.Body>
                <h2 className="text-center mb-2">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" defaultValue={currentUser.email} ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Leave blank if don't want to update" />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank if don't want to update" />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Save</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 mt-2 text-center">
            <Link to="/">Cancel</Link>
        </div>
    </div>);
}

export default UpdateProfile;