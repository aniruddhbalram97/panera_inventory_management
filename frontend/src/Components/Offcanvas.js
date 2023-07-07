import {useState} from 'react';
import {Link} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { imageMetaData } from "./constants";
import styles from "./../Styles/offcanvas.module.css";

function Sidebar() {
  const shop = "Panera"; // should come as a prop
  const [detailedTab,setDetailedTab] = useState(false);
  const [tableTab, setTableTab] = useState(false);
  const [visualizationTab, setVisualizationTab] = useState(false);

  const handleDetailedTab = ()=>{
    setDetailedTab(true);
    setTableTab(false);
    setVisualizationTab(false);
  }
  const handleTableTab = ()=>{
    setDetailedTab(false);
    setTableTab(true);
    setVisualizationTab(false);
  }
  const handleVisualizationTab = ()=>{
    setDetailedTab(false);
    setTableTab(false);
    setVisualizationTab(true);
  }
  return (
    <>
      <Navbar
        key="false"
        expand="false"
        className={`${styles[`${shop}_navbar_bg`]} mb-3`}
      >
        <Container fluid>
          <Navbar.Brand className={`${styles[`${shop}_navbar_brand`]}`}>
            <img
              alt=""
              src={require(`${imageMetaData[`${shop}`].url}`)}
              width={imageMetaData[`${shop}`].width}
              height={imageMetaData[`${shop}`].height}
              className="d-inline-block align-top"
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-false`}
            className={`${styles[`${shop}_navbar_toggle`]}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-'false'`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
            className={`${styles[`${shop}_navbar_offcanvas`]}`}
          >
            <Offcanvas.Header
              className={`${styles[`${shop}_navbar_offcanvas_header`]}`}
              closeButton
            >
              <Navbar.Brand id={`offcanvasNavbarLabel-expand-false`}>
                <img
                  alt=""
                  src={require(`${imageMetaData[`${shop}`].url}`)}
                  width={imageMetaData[`${shop}`].width}
                  height={imageMetaData[`${shop}`].height}
                  className="d-inline-block align-top"
                ></img>
              </Navbar.Brand>
            </Offcanvas.Header>
            <Offcanvas.Body >
              <Nav className={`flex-grow-1 pe-3 ${styles[`${shop}_navbar_offcanvas_body`]}`}>
                <Nav.Link onClick={handleDetailedTab} className={`${detailedTab?styles[`${shop}_navbar_offcanvas_body_active`]:''} ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to={'/dashboard/detailed_view'}>
                    Detailed-View
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={handleTableTab} className={`${tableTab?styles[`${shop}_navbar_offcanvas_body_active`]:''} ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to ={'/dashboard/table_view'}>
                    Table-View
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={handleVisualizationTab} className={`${visualizationTab?styles[`${shop}_navbar_offcanvas_body_active`]:''} ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to ={'/dashboard/visualization_view'}>
                    Visualization
                  </Link>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar;
