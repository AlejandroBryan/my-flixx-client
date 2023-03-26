import { Form, Col, Row } from 'react-bootstrap';

const SearchBox = ({ searchfield, searchChange }) => {
   return (
      <Row className="d-flex justify-content-center m-5">
         <Col lg={3}>
            <Form className="d-flex">
               <Form.Control
                  type="search"
                  placeholder="Search for a movie..."
                  className="me-2"
                  aria-label="Search"
                  onChange={searchChange}
               />
            </Form>
         </Col>
      </Row>
   );
};
export default SearchBox;
