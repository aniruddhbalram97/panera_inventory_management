import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../app/dataReducer";
import { addDays } from "../../app/helperFunctions";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./../../Styles/detailedview.module.css";

function InventoryCard(props) {
  const shop = "Panera";
  const selectedData = useSelector((state) => state.dataReducer.selectedData);
  const selectedDate = useSelector((state) => state.dataReducer.selectedDate);
  const dispatch = useDispatch();
  const handleCardClick = () => {
    dispatch(updateData(props.data));
  };

  const tryRequire = () => {
    try {
      return require(`./../images/${props.data.location_}/${props.data.inventory_id}.jpg`);
    } catch (err) {
      return require(`./../images/${props.data.shop_id}.svg`);
    }
  };

  if (props.data) {
    return (
      <Container
        onClick={handleCardClick}
        className={`${styles[`${shop}_detailed_view_card`]} ${
          selectedData
            ? selectedData.inventory_id == props.data.inventory_id
              ? styles[`${shop}_detailed_view_card_active`]
              : ""
            : ""
        }`}
        fluid
      >
        <Row>
          <Col className={`${styles[`${shop}_detailed_view_card_image`]}`}>
            <Image
              style={{ width: 70, aspectRatio: "1/1" }}
              src={tryRequire()}
              rounded
              sizes="50"
            ></Image>
          </Col>
          <Col
            className={`${
              styles[`${shop}_detailed_view_card_content_container`]
            } ${
              selectedData
                ? selectedData.inventory_id == props.data.inventory_id
                  ? styles[
                      `${shop}_detailed_view_card_content_container_active`
                    ]
                  : ""
                : ""
            }`}
          >
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_header`]
              } ${
                selectedData
                  ? selectedData.inventory_id == props.data.inventory_id
                    ? styles[`${shop}_detailed_view_card_content_header_active`]
                    : ""
                  : ""
              }`}
            >
              <Col
                md={3}
                className={`${styles[`${shop}_detailed_view_card_content`]} ${
                  styles[`${shop}_detailed_view_card_content_body`]
                } ${
                  selectedData
                    ? selectedData.inventory_id == props.data.inventory_id
                      ? styles[`${shop}_detailed_view_card_content_body_active`]
                      : ""
                    : ""
                }`}
              >
                {props.data.created_date == null
                  ? "No Data"
                  : selectedDate
                      .toLocaleDateString("en-US")
                      .replaceAll("/", "-")}
              </Col>
              <Col>
                {props.data.description == null
                  ? "No Data"
                  : props.data.description}
              </Col>
            </Row>
            <Row
              className={`${styles[`${shop}_detailed_view_card_content`]} ${
                styles[`${shop}_detailed_view_card_content_body`]
              } ${
                selectedData
                  ? selectedData.inventory_id == props.data.inventory_id
                    ? styles[`${shop}_detailed_view_card_content_body_active`]
                    : ""
                  : ""
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
              } ${
                selectedData
                  ? selectedData.inventory_id == props.data.inventory_id
                    ? styles[`${shop}_detailed_view_card_content_body_active`]
                    : ""
                  : ""
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
