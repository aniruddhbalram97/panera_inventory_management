import React from 'react'
import Datepicker from '../Datepicker';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from './CardGroup';
import InventoryForm from './InventoryForm';
import styles from './../../Styles/detailedview.module.css'
function DetailedView() {
  const shop = 'Panera';
  return (
    <Container fluid className={styles[`${shop}_detailed_view_container`]}>
      <Row>
        <Col xs={12} md={{span:8}}>
          <div className = {`${styles[`${shop}_detailed_view_title`]}`}>Detailed View</div>
        </Col>
        <Col className = {`${styles[`${shop}_detailed_view_date_container`]}`}>
        <Datepicker/>
        </Col>
      </Row>
        
      <Row >
        <Col xs={6} md={6} lg={6} xl={5}>
          <CardGroup/>
        </Col>
        <Col>
          <InventoryForm/>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailedView