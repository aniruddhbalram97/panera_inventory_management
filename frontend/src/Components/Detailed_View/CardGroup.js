import React from 'react'
import Container from 'react-bootstrap/Container'
import styles from './../../Styles/detailedview.module.css'
import InventoryCard from './Card';
import Row from 'react-bootstrap/Row'
import {inventory_data} from './../testdata'
function CardGroup() {
const shop = 'Panera'
  return (
    <Container className={`${styles[`${shop}_detailed_view_card_group_container`]}`} fluid>
      {
      inventory_data.map((data,idx) =>{
        return (<Row><InventoryCard key = {data.inventory_id} data = {data}/></Row>)
      })
      }
    </Container>
  )
}

export default CardGroup