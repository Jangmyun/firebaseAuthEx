import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

const { Link } = require("react-router-dom");

function Home(props) {
  return (
    <div id="homeContainer">
      <Link to="/login">로그인 페이지 이동</Link>
      <br></br>
      <Link to="/img">Img 업로드</Link>
      <Container>
        <Row xs={1} fluid="sm">
          <Col md={5}>
            <FormGroup className="">
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="handonge@handong.ac.kr"
                type="email"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              ></Input>
              <Label for="password" className="">
                password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
              ></Input>
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
