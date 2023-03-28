import { Col, Card, Button } from 'react-bootstrap';

const UserInfo = ({ user, handleUserDelete }) => {
   return (
      <Col md={4} className="mb-3">
         <Card>
            <Card.Body>
               <Card.Title> Hello {user.Username} </Card.Title>
               <div>Firstname: {user.Firstname}</div>
               <div>lastname: {user.Lastname}</div>
               <div>Email: {user.Email}</div>
            </Card.Body>
         </Card>
         <Button className="mt-3" variant="danger" onClick={handleUserDelete}>
            Delete Account
         </Button>
      </Col>
   );
};
export default UserInfo;
