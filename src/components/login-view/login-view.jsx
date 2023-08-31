import { API } from '../../utils';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './login-view.scss';

const LoginView = ({ onLoggedIn }) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
         Username: username,
         Password: password,
      };

      fetch(`${API}/users/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST',
         },
         body: JSON.stringify(data),
      })
         .then((response) => response.json())
         .then(({ user, token }) => {
            if (user) {
               localStorage.setItem('user', JSON.stringify(user));
               localStorage.setItem('token', token);
               onLoggedIn(user, token);
            } else {
               alert('Login failed');
            }
         })
         .catch((error) => alert('Something went wrong', error.message));
   };
   return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
         <Form onSubmit={handleSubmit}>
            <legend>Login: </legend>
            <Form.Group controlId="loginUsername">
               <Form.Label>Username:</Form.Label>
               <Form.Control
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
               ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
               <Form.Label>Password:</Form.Label>
               <Form.Control
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               ></Form.Control>
            </Form.Group>
            <Button variant="secondary" className="w-100" md={5} type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default LoginView;
