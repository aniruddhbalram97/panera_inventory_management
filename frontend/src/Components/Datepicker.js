import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {useSelector, useDispatch} from 'react-redux';
import { changeDetailedDate } from '../app/dataReducer';
// import styles from './../Styles/detailedview.module.css'
import './../Styles/datepicker.css'
function Datepicker() {
  const shop = 'Panera'
  const date = useSelector((state)=>state.dataReducer.date);
  const dispatch = useDispatch();
  return (
    <div>
        <DatePicker
          dayClassName={(date)=>{return `${shop}_datepicker_day`}}
          calendarClassName = {`${shop}_datepicker`}
          className={`${shop}_datepicker_input`}
          onChange = {(date) => dispatch(changeDetailedDate(date))}
          selected = {date}
          dateFormat={"MM-dd-yyyy"}
          includeDates={[new Date('07-08-2023'), new Date('07-09-2023')]}
          showIcon
        />

    </div>
  )
}

export default Datepicker