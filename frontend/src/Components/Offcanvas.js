import {Link} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {useSelector, useDispatch} from 'react-redux';
import { changeDetailedTab, changeTableTab, changeVisualizationTab } from '../app/uiReducer';
import { imageMetaData } from "./constants";
import styles from "./../Styles/offcanvas.module.css";

function Sidebar() {
  const shop = "Panera"; // should come as a prop
  const detailedTab = useSelector((state)=>state.uiReducer.detailedTab);
  const tableTab = useSelector((state)=>state.uiReducer.tableTab);
  const visualizationTab = useSelector((state)=>state.uiReducer.visualizationTab) 
  const dispatch = useDispatch();

  return (
    <>
      <Navbar
        key="false"
        expand="false"
        className={`${styles[`${shop}_navbar`]} mb-3`}
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
                <Nav.Link onClick={()=> {dispatch(changeDetailedTab())}} className={`${detailedTab?styles[`${shop}_navbar_offcanvas_body_active`]:''} ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to={'/dashboard/detailed_view'}>
                    Detailed
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={()=>{dispatch(changeTableTab())}} className={`${tableTab?styles[`${shop}_navbar_offcanvas_body_active`]:''} ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
                  <Link className="nav-link" to ={'/dashboard/table_view'}>
                    Table
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={()=>{dispatch(changeVisualizationTab())}} className={`${visualizationTab?styles[`${shop}_navbar_offcanvas_body_active`]:''} ${styles[`${shop}_navbar_offcanvas_body_nav`]}`}>
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