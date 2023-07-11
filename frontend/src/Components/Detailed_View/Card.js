import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { updateData } from "../../app/dataReducer";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./../../Styles/detailedview.module.css";

function InventoryCard(props) {
  const shop = "Panera";
  const dispatch =  useDispatch();
  //console.log("Data:", props.data.description);
  if (props.data) {
    return (
      <Container onClick={()=>{dispatch(updateData(props.data))}} className={`${styles[`${shop}_detailed_view_card`]}`} fluid>
        <Row>
          <Col className={`${styles[`${shop}_detailed_view_card_image`]}`}>
            <Image
              style={{ width: 70, aspectRatio: "1/1" }}
              src={require("./../images/mock_image.jpg")}
              rounded
              sizes="50"
            ></Image>
          </Col>
          <Col
            className={`${
              styles[`${shop}_detailed_view_card_content_container`]
            }`}
          >
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_header`]
              } `}
            >
              <Col>
                {props.data.description == null
                  ? "No Data"
                  : props.data.description}
              </Col>
            </Row>
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_body`]
              }`}
            >
              <Col>
                Inventory ID -{" "}
                {props.data.inventory_id == null
                  ? "No Data"
                  : props.data.inventory_id}
              </Col>
            </Row>
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_body`]
              }`}
            >
              <Col>FoodPro ID - 2314451</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InventoryCard;
