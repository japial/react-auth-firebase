import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox to change password");
        } catch {
            setError('Failed to login');
        }
        setLoading(false);
    };


    return ( <div className="col-6 mx-auto py-3">
    <Card>
        <Card.Body>
            <h2 className="text-center mb-2">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 mt-2 text-center">
        <Link to="/login">Login</Link>
    </div>
</div> );
}
 
export default ForgotPassword;