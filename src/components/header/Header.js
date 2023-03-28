import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { searchStateTag } from "../../redux/states/searchSlice";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header({ child, title }) {
  const searchTag = useSelector(searchStateTag);

  const [tag, setTag] = useState(searchTag);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/search?tag=${tag}`);
  }
  function handleChange(event) {
    setTag(event.target.value);
  }

  useEffect(() => {
    setTag(searchTag);
  }, [searchTag]);
  return (
    <Container className="mt-5">
      <h2 className="text-center">{title}</h2>
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Row className="row-cols-1 w-100">
            <Col>
              <Form.Label>Search by Tag</Form.Label>
            </Col>
          </Row>
          <Row className="row-cols-12 w-100">
            <Col xs="12" sm="9" xl="10" xxl="11" className="pb-3">
              <Form.Control
                id="tag"
                name="tag"
                placeholder="write your tag here..."
                value={tag}
                onChange={handleChange}
              />
            </Col>
            <Col xs="12" sm="3" xl="2" xxl="1" className="pb-3">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
}
export default Header;
