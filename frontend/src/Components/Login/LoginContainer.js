import React from "react";
import Container from "react-bootstrap/Container";
import Signin from "./Signin";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./../../Styles/login.module.css";
function LoginContainer() {
  return (
    <Container className={`${styles["login-container"]}`} fluid={true}>
      <Row style={{justifyContent:'center'}}>
        <img style={{maxHeight:100}}src={require("./../images/Login_Logo.gif")}></img>
      </Row>
      <Row>
        <Col>
          <Signin />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginContainer;
