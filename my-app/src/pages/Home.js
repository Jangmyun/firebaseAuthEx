import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Modal from "../components/Modal/Modal";
import { useState } from "react";

const { Link } = require("react-router-dom");

function Home(props) {
  const [isOpened, setIsOpened] = useState(true);

  function closeThisModal() {
    setIsOpened(false);
  }

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
      <div>
        <button>Modal 열기</button>
        <Modal title={"Modal"} onClose={closeThisModal} isOpened={isOpened}>
          <h1>hi</h1>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
