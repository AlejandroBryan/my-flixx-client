import {Col, Card} from 'react-bootstrap';

const UserInfo=({user})=>{
    return(
        <Col md={4} className="mb-3"  >
        <Card>
        <Card.Body>
            <Card.Title> Hello {user.Username} </Card.Title>
                <div>
                Firstname:  {user.Firstname}
                </div>
                <div>
                lastname: {user.Lastname}
                </div>
                <div>
                  Email:  {user.Email}
                </div>
          </Card.Body>
        </Card>
       
    </Col>
    )
}
export default UserInfo;