import { useState } from "react";
import { Col, Form, Button, Card } from "react-bootstrap";


const UpdateView = ({user, token})=>{

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleUpdate =(event)=>{

        event.preventDefault();

        const data = {
            Firstname: firstname,
            Lastname: lastname,
            Username:  username,
            Password: password,
            Email:     email,
            Birthday:  birthday
        }

        fetch(`http://localhost:5000/api/v1/users/${user.Username}`,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response)=> response.json())
          .then((updatedUser) =>{
            if(updatedUser){
                alert('Successfully updated');
                console.log(updatedUser)
                localStorage.clear();
                window.location.reload();
            }else{
                alert('Failed to update')
            }
        })
         
    };
return (
   
<Col md={6}>
    <Card>
          <Card.Body>
            <Form onSubmit={handleUpdate}>
             <legend>Update your personal information:</legend>
                    <Form.Group controlId="signupFirstname">
                        <Form.Label>
                        Firstname:
                        </Form.Label>
                        <Form.Control
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        minLength="3"
                        maxLength="30"
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="signupLastname">
                        <Form.Label>Lastname:</Form.Label>
                        <Form.Control
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                        minLength="3"
                        maxLength="30">
                        </Form.Control>
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
                        >
                        </Form.Control>
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
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
             <Button variant="primary" className="mt-3" type="submit">Submit</Button>
         </Form>
        </Card.Body>
    </Card>
</Col>      
)}

export default UpdateView;