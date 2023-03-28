import { API } from '../../utils';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { redirect } from 'react-router-dom';

const SignupView = () => {
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
         Firstname: firstname,
         Lastname: lastname,
         Username: username,
         Password: password,
         Email: email,
         Birthday: birthday,
      };

      fetch(`${API}/users/register`, {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
         },
      }).then((response) => {
         if (response.ok) {
            alert('Successfully registered');
            redirect('/');
            window.location.reload();
         } else {
            alert('Failed to register');
         }
      });
   };

   return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
         <Form onSubmit={handleSubmit}>
            <legend>Register:</legend>

            <Form.Group controlId="signupFirstname">
               <Form.Label>Firstname:</Form.Label>
               <Form.Control
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  minLength="3"
                  maxLength="30"
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId="signupLastname">
               <Form.Label>Lastname:</Form.Label>
               <Form.Control
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  minLength="3"
                  maxLength="30"
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId="signupUsername">
               <Form.Label>Username:</Form.Label>
               <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                  maxLength="15"
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId="signupPassword">
               <Form.Label>Password:</Form.Label>
               <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  maxLength="12"
               ></Form.Control>
            </Form.Group>

            <Form.Group>
               <Form.Label>Email:</Form.Label>
               <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
               <Form.Label> Birthday:</Form.Label>
               <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
               ></Form.Control>
            </Form.Group>
            <Button variant="primary" className="my3 w-100" type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default SignupView;
