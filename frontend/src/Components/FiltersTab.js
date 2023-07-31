import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import styles from './../Styles/common.module.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Datepicker from "./Datepicker";
import ExportToExcelBtn from "./Table_View/ExportToExcelBtn";
import LocationDropdown from "./Dropdown";
function FiltersTab(props) {
const detailedTab = useSelector((state)=>state.uiReducer.detailedTab)
const tableTab = useSelector((state)=>state.uiReducer.tableTab)
const visualizationTab = useSelector((state)=>state.uiReducer.visualizationTab)
const onDownload = props.onDownload;
 const shop = "Panera"
  return (
    <Row className={`${styles[`${shop}_common_title_row`]}`}>
      <Col xs={12} md={{ span: 4 }}>
        <div className={`${styles[`${shop}_common_title`]}`}>
          {detailedTab? "DATA ENTRY":tableTab?"TABLE VIEW":"VISUALIZATION"}
        </div>
      </Col>
      <Col className={`${styles[`${shop}_common_date_container`]}`}>
        <Datepicker />
        <LocationDropdown />
        {tableTab?<ExportToExcelBtn onDownload={onDownload}/>:null}
      </Col>
    </Row>
  );
}

export default FiltersTab;
