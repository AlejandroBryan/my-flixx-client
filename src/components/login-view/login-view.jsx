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
      <Form onSubmit={handleSubmit} className='form-signin'>
         <legend>Login:</legend>
         <Form.Group controlId="loginUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            ></Form.Control>
         </Form.Group>

         <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            ></Form.Control>
         </Form.Group>
         <Button variant="secondary" className="my3" md={5} type="submit">
            Submit
         </Button>
      </Form>
   );
};

export default LoginView;
