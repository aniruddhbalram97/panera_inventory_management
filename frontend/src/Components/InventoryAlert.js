import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToastMessage } from "../app/dataReducer";
import Alert from "react-bootstrap/Alert";
function InventoryAlert() {
  const toastMessage = useSelector((state) => state.dataReducer.toastMessage);
  const dispatch = useDispatch();
//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(updateToastMessage(""));
//     }, 3000);
//   }, []);
  if (toastMessage)
    return <Alert variant={toastMessage.type}>{toastMessage.msg}</Alert>;
  else return null;
}

export default InventoryAlert;
