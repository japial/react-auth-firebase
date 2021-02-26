import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to login');
        }
        setLoading(false);
    };

    return ( <div className="col-6 mx-auto py-3">
        <Card>
            <Card.Body>
                <h2 className="text-center mb-2">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Login</Button>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Link to="/forgot-password">Forgot Password?</Link>
            </Card.Footer>
        </Card>
        <div className="w-100 mt-2 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
    </div> );
}
 
export default Login;