import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./../../Styles/detailedview.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCase_,
  setAdjustedPar,
  setBag,
  setEa,
  setGal,
  setLbs,
  setOpenOrders,
  setOz,
  setSleeves,
  setTotalCases,
  setTray,
  setOrder,
  setAdjustedOrder,
  setSales,
  setYield,
  refetchUpdatedData,
  updateToastMessage,
} from "../../app/dataReducer";
import Form from "react-bootstrap/Form";

function InventoryForm() {
  const shop = "Panera";
  const order_ = useSelector((state) => state.dataReducer.order_);
  const adjusted_order_ = useSelector(
    (state) => state.dataReducer.adjustedOrder
  );
  const selectedDate = useSelector((state) => state.dataReducer.selectedDate);
  const openOrders = useSelector((state) => state.dataReducer.openOrders);
  const adjustedPar = useSelector((state) => state.dataReducer.adjustedPar);
  const case_ = useSelector((state) => state.dataReducer.case_);
  const lbs = useSelector((state) => state.dataReducer.lbs);
  const bag = useSelector((state) => state.dataReducer.bag);
  const tray = useSelector((state) => state.dataReducer.tray);
  const ea = useSelector((state) => state.dataReducer.ea);
  const oz = useSelector((state) => state.dataReducer.oz);
  const gal = useSelector((state) => state.dataReducer.gal);
  const sleeves = useSelector((state) => state.dataReducer.sleeves);
  const totalCases = useSelector((state) => state.dataReducer.totalCases);
  const sales = useSelector((state) => state.dataReducer.sales);
  const yield_ = useSelector((state) => state.dataReducer.yield);
  const selectedData = useSelector((state) => state.dataReducer.selectedData);
  const dispatch = useDispatch();
  const unlock = selectedData.unlock.split("-");
  console.log("UNLOCK: ", unlock);
  // For live calculations of adjusted order and order
  useEffect(() => {
    if (selectedData) {
      if (selectedData.total_case) {
        dispatch(
          setTotalCases(totalCases ? totalCases : selectedData.total_case)
        );
      }
    }
  }, [selectedData]);
  const tryRequire = () => {
    try {
      return require(`./../images/${selectedData.location_}/${selectedData.inventory_id}.jpg`);
    } catch (err) {
      return require(`./../images/${selectedData.shop_id}.svg`);
    }
  };
  useEffect(() => {
    if (selectedData) {
      // ORDER //
      let _order_;
      if (selectedData.order_) {
        _order_ = selectedData.order_;
      } else if (selectedData.system_par) {
        if (selectedData.total_case)
          _order_ = selectedData.system_par - selectedData.total_case;
        else if (totalCases) _order_ = selectedData.system_par - totalCases;
        else {
          _order_ = selectedData.system_par;
        }
      } else {
        _order_ = 0;
      }
      if (totalCases) {
        if (selectedData.system_par) {
          _order_ = selectedData.system_par - totalCases;
        }
      }

      // ADJUSTED ORDER //
      let _adjusted_order_;
      if (selectedData._adjusted_order_) {
        _adjusted_order_ = selectedData._adjusted_order_;
      } else if (selectedData.adjusted_par) {
        if (selectedData.total_case)
          _adjusted_order_ =
            selectedData.adjusted_par - selectedData.total_case;
        else if (selectedData.total_case && adjustedPar)
          _adjusted_order_ = adjustedPar - selectedData.total_case;
        else if (adjustedPar && totalCases)
          _adjusted_order_ = adjustedPar - totalCases;
        else {
          _adjusted_order_ = selectedData.adjusted_par;
        }
      } else {
        _adjusted_order_ = 0;
      }
      if (adjustedPar) {
        if (selectedData.total_case) {
          _adjusted_order_ = adjustedPar - selectedData.total_case;
          console.log("adjusted_order", _adjusted_order_);
        }
      }
      if (totalCases) {
        _adjusted_order_ = -totalCases;
        if (selectedData.adjusted_par) {
          _adjusted_order_ = selectedData.adjusted_par - totalCases;
        }
        if (adjustedPar) {
          _adjusted_order_ = adjustedPar - totalCases;
        }
      }
      dispatch(setOrder(_order_));
      dispatch(setAdjustedOrder(_adjusted_order_));
    }
  }, [totalCases, adjustedPar, order_]);

  // For live calculations of total cases
  useEffect(() => {
    if (selectedData) {
      let total_cases_;
      let _case_ = case_ == null ? selectedData.case_ : case_;
      let lbs_ = lbs == null ? selectedData.lb : lbs;
      let bag_ = bag == null ? selectedData.bag : bag;
      let tray_ = tray == null ? selectedData.tray : tray;
      let ea_ = ea == null ? selectedData.ea : ea;
      let oz_ = oz == null ? selectedData.oz : oz;
      let gal_ = gal == null ? selectedData.gal : gal;
      let sleeves_ = sleeves == null ? selectedData.sleeves : sleeves;
      if (selectedData.pack == null || selectedData.pack == 0) {
        console.log(
          "PACK IS 0. SETTING. SETTING TOTAL CASES TO INITIAL CASE VALUE"
        );
        total_cases_ = case_;
      } else {
        total_cases_ =
          Number(_case_) +
          (Number(lbs_) +
            Number(bag_) +
            Number(tray_) +
            Number(ea_) +
            Number(oz_) +
            Number(gal_) +
            Number(sleeves_)) /
            Number(selectedData.pack);
      }

      dispatch(setTotalCases(total_cases_));
    }
  }, [case_, lbs, bag, tray, ea, oz, gal, sleeves, totalCases]);
  useEffect(() => {
    if (selectedData) {
      dispatch(setCase_(""));
      dispatch(setTray(""));
      dispatch(setAdjustedPar(""));
      dispatch(setBag(""));
      dispatch(setEa(""));
      dispatch(setGal(""));
      dispatch(setLbs(""));
      dispatch(setOpenOrders(""));
      dispatch(setOz(""));
      dispatch(setSleeves(""));
      dispatch(
        setTotalCases(totalCases ? totalCases : selectedData.total_case)
      );
      dispatch(setAdjustedOrder(""));
      dispatch(setOrder(""));
      dispatch(setSales(""));
      dispatch(setYield(""));
    }
  }, [selectedData]);
  console.log(
    "TOTAL CASES: ",
    totalCases,
    "total_cases:",
    selectedData.total_case
  );
  const updateInventory = async (e) => {
    e.preventDefault();
    const inventory_id = selectedData.inventory_id;
    //const date = addDays(new Date(selectedData.created_date),1).toLocaleDateString("en-US").replaceAll("/", "-")
    const date = selectedDate.toLocaleDateString("en-US").replaceAll("/", "-");
    let _case_ = case_ == "" ? selectedData.case_ : case_;
    let lbs_ = lbs == "" ? selectedData.lb : lbs;
    let bag_ = bag == "" ? selectedData.bag : bag;
    let tray_ = tray == "" ? selectedData.tray : tray;
    let ea_ = ea == "" ? selectedData.ea : ea;
    let oz_ = oz == "" ? selectedData.oz : oz;
    let gal_ = gal == "" ? selectedData.gal : gal;
    let sleeves_ = sleeves == "" ? selectedData.sleeves : sleeves;
    let adjusted_par = adjustedPar ? adjustedPar : selectedData.adjusted_par;
    let open_orders = openOrders ? openOrders : selectedData.open_orders;
    let sales_ = sales ? sales : selectedData.sales;
    let _yield_ = yield_ ? yield_ : selectedData.yield;
    let adjusted_order = adjusted_order_
      ? adjusted_order_
      : selectedData.adjusted_order;
    console.log("CASE: ", case_, "LBS: ", lbs);
    try {
      const response = await fetch(
        `http://localhost:5000/update_existing_inventory/${inventory_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: date,
            case_: _case_,
            lb: lbs_,
            bag: bag_,
            sleeves: sleeves_,
            tray: tray_,
            gal: gal_,
            oz: oz_,
            adjusted_par: adjusted_par,
            ea: ea_,
            open_orders: open_orders,
            order_: order_,
            adjusted_order: adjusted_order,
            total_case: totalCases,
            sales: sales_,
            yield: _yield_,
          }),
        }
      );
      dispatch(
        updateToastMessage({
          type: "SUCCESS",
          msg: `Data for ${selectedData.inventory_id} was updated`,
        })
      );
      console.log(response);
      fetchUpdatedData(date);
    } catch (err) {
      dispatch(updateToastMessage({ type: "ERROR", msg: err.message }));
      console.error(err.message);
    }
  };
  const fetchUpdatedData = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get_inventory_data/${date}`
      );
      const requestedData = await response.json();
      dispatch(refetchUpdatedData(requestedData));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Container
      className={`${styles[`${shop}_detailed_view_inventory_form_container`]}`}
    >
      <Form
        onSubmit={(e) => {
          updateInventory(e);
        }}
      >
        <Row>
          <Col
            md={{ span: 12, offset: 0 }}
            className={`${
              styles[`${shop}_detailed_view_inventory_form_title`]
            }`}
          >
            {selectedData ? selectedData.inventory_id : "INVENTORY ID"} -{" "}
            {selectedData ? selectedData.description : "INVENTORY DESCRIPTION"}
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <Row style={{ paddingTop: 1.75 }}>
              <Col
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_image`]
                }`}
                md={{ span: 6, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                <Image
                  style={{ aspectRatio: 1, maxHeight: "90%", maxWidth: "90%" }}
                  src={tryRequire()}
                  rounded
                  sizes="50"
                ></Image>
              </Col>
              <Col md={6} className={`${styles[`${shop}_ipad_view`]}`}>
                <Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_View_label`
                        ]
                      }`}
                    >
                      SALES
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_view_col`
                        ]
                      }`}
                    >
                      <Form.Control
                        name={"SALES"}
                        placeholder={
                          selectedData ? selectedData.open_orders : ""
                        }
                        className={`${
                          styles[
                            `${shop}_detailed_view_inventory_form_ipad_view_input`
                          ]
                        }`}
                        pattern="^[0-9]*$"
                        onChange={(e) => {
                          if (!e.target.validity.patternMismatch) {
                            dispatch(setSales(e.target.value));
                          }
                        }}
                        value={sales}
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_View_label`
                        ]
                      }`}
                    >
                      ADJUSTED SALES
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_view_col`
                        ]
                      }`}
                    >
                      <Form.Control
                        name={"ADJUSTED_SALES"}
                        placeholder={"Calculated Adjusted Sales"}
                        className={`${
                          styles[
                            `${shop}_detailed_view_inventory_form_ipad_view_input`
                          ]
                        }`}
                        disabled
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_View_label`
                        ]
                      }`}
                    >
                      YIELD
                    </Col>
                  </Row>
                  <Row
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_ipad_view_input_row`
                      ]
                    }`}
                  >
                    <Col
                      className={`${
                        styles[
                          `${shop}_detailed_view_inventory_form_ipad_view_col`
                        ]
                      }`}
                    >
                      <Form.Control
                        style={{ marginBottom: 0 }}
                        name={"YIELD"}
                        pattern="^[0-9]*$"
                        onChange={(e) => {
                          if (!e.target.validity.patternMismatch) {
                            dispatch(setYield(e.target.value));
                          }
                        }}
                        placeholder={selectedData ? selectedData.yield : ""}
                        value={yield_}
                        className={`${
                          styles[
                            `${shop}_detailed_view_inventory_form_ipad_view_input`
                          ]
                        }`}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col md={12} xl={8}>
                <Row
                  style={{ paddingTop: 0 }}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    PACK
                  </Col>
                  <Col
                    xl={9}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"PACK"}
                      value={selectedData ? selectedData.pack : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    SIZE
                  </Col>
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"SIZE"}
                      value={selectedData ? selectedData.size : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    MEASUREMENT
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"MEASUREMENT"}
                      value={selectedData ? selectedData.measurement : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    UOM
                  </Col>
                  <Col
                    xl={3}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"UOM"}
                      value={selectedData ? selectedData.uom : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    SYSTEM PAR
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"SYSTEM_PAR"}
                      value={selectedData ? selectedData.system_par : ""}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <div
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_horizontal_line`
                      ]
                    }`}
                  ></div>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    OPEN ORDERS
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"OPEN_ORDERS"}
                      placeholder={selectedData ? selectedData.open_orders : ""}
                      value={openOrders}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setOpenOrders(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    ADJUSTED PAR
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      placeholder={
                        selectedData ? selectedData.adjusted_par : ""
                      }
                      name={"ADJUSTED_PAR"}
                      value={adjustedPar}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setAdjustedPar(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <div
                    className={`${
                      styles[
                        `${shop}_detailed_view_inventory_form_horizontal_line`
                      ]
                    }`}
                  ></div>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={12}
                    md={12}
                    style={{ justifyContent: "center" }}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    ON-HAND INVENTORY
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    CASE
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      //name={"CASE"}
                      placeholder={selectedData ? selectedData.case_ : ""}
                      value={case_}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setCase_(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    LBS
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"LBS"}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "LB")
                            ? false
                            : true
                          : false
                      }
                      placeholder={selectedData ? selectedData.lb : ""}
                      value={lbs}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setLbs(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    BAG
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"BAG"}
                      placeholder={selectedData ? selectedData.bag : ""}
                      value={bag}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "BAG")
                            ? false
                            : true
                          : false
                      }
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setBag(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    TRAY
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"TRAY"}
                      placeholder={selectedData ? selectedData.tray : ""}
                      value={tray}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "TRAY")
                            ? false
                            : true
                          : false
                      }
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setTray(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    EA
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"EA"}
                      placeholder={selectedData ? selectedData.ea : ""}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "EA")
                            ? false
                            : true
                          : false
                      }
                      value={ea}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setEa(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    OZ
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"OZ"}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "OZ")
                            ? false
                            : true
                          : false
                      }
                      placeholder={selectedData ? selectedData.oz : ""}
                      value={oz}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setOz(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    GAL
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"GAL"}
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "GAL")
                            ? false
                            : true
                          : false
                      }
                      placeholder={selectedData ? selectedData.gal : ""}
                      value={gal}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setGal(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                  <Col
                    xl={2}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    SLEEVES
                  </Col>
                  <Col
                    xl={4}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"SLEEVES"}
                      placeholder={selectedData ? selectedData.sleeves : ""}
                      value={sleeves}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      pattern="^[0-9]*$"
                      disabled={
                        unlock
                          ? unlock[0] == "N/A"
                            ? false
                            : unlock.find((element) => element == "SLEEVE")
                            ? false
                            : true
                          : false
                      }
                      onChange={(e) => {
                        if (!e.target.validity.patternMismatch) {
                          dispatch(setSleeves(e.target.value));
                        }
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    CALCULATED ON-HAND CASES
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"TOTAL_CASES"}
                      placeholder={"Calculated Total Cases"}
                      value={totalCases ? totalCases : selectedData.total_case}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_row`]
                  }`}
                >
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_label`]
                    }`}
                  >
                    CALCULATED ON-HAND EA
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    className={`${
                      styles[`${shop}_detailed_view_inventory_form_input_col`]
                    }`}
                  >
                    <Form.Control
                      name={"TOTAL_CASES"}
                      placeholder={"Calculated Total Cases"}
                      value={totalCases ? totalCases : selectedData.total_case}
                      className={`${
                        styles[`${shop}_detailed_view_inventory_form_input`]
                      }`}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                ORDER
              </Col>
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"ORDER"}
                  value={order_}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row
              className={`${
                styles[`${shop}_detailed_view_inventory_form_row`]
              }`}
            >
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                ADJUSTED ORDER
              </Col>
              <Col
                xl={6}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"ADJUSTED_ORDER"}
                  value={adjusted_order_}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row style={{ paddingTop: 1.75 }}>
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row
              style={{ paddingTop: 1.75 }}
              className={`${styles[`${shop}_big_screen_view`]}`}
            >
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                SALES
              </Col>
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"SALES"}
                  pattern="^[0-9]*$"
                  onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                      dispatch(setSales(e.target.value));
                    }
                  }}
                  placeholder={selectedData ? selectedData.sales : ""}
                  value={sales}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                ></Form.Control>
              </Col>
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                ADJUSTED SALES
              </Col>
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"ADJUSTED_SALES"}
                  placeholder={"Calculated Adjusted Sales"}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                  disabled
                ></Form.Control>
              </Col>
            </Row>
            <Row
              style={{ paddingTop: 1.75 }}
              className={`${styles[`${shop}_big_screen_view`]}`}
            >
              <Col
                xl={3}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_label`]
                }`}
              >
                YIELD
              </Col>
              <Col
                xl={9}
                md={6}
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_col`]
                }`}
              >
                <Form.Control
                  name={"YIELD"}
                  pattern="^[0-9]*$"
                  onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                      dispatch(setYield(e.target.value));
                    }
                  }}
                  placeholder={selectedData ? selectedData.yield : ""}
                  value={yield_}
                  className={`${
                    styles[`${shop}_detailed_view_inventory_form_input`]
                  }`}
                ></Form.Control>
              </Col>
            </Row>

            <Row style={{ paddingTop: 1.75 }}>
              <div
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_horizontal_line`]
                }`}
              ></div>
            </Row>
            <Row style={{ paddingTop: 0, paddingBottom: 10 }}>
              <Col
                className={`${
                  styles[`${shop}_detailed_view_inventory_form_input_btn_col`]
                } ${styles[`${shop}_detailed_view_inventory_form_input_col`]}`}
                xs={{ span: 4, offset: 4 }}
              >
                <Button
                  bsPrefix={`${
                    styles[`${shop}_detailed_view_inventory_form_update_button`]
                  }`}
                  type="submit"
                >
                  Update Data
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default InventoryForm;
