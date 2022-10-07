import React from "react";
import { useDispatch, useSelector } from "react-redux";

import style from './style.module.css';
import { updateDataTable } from "../../redux/appSlice";
const PageList = (props) => {
    const body = useSelector((state) => state.app.request);
    const dispatch = useDispatch();
    function clickNewPage(page) {
        if (page != props.page) {
            dispatch(updateDataTable(body, page, props.quantityRowsOnePage));
        }
    }
    console.log(props)
    let listPage = props.quantityPage.map(el => {
        return <div key={el}
            className={el != props.page ? style.itemPage : style.itemPage + ' ' + style.itemPageActive}
            onClick={() => clickNewPage(el)}>{el}</div>
    })


    return (
        <>
            <div className={style.pages}>
                {listPage}
            </div>
        </>
    )
}
export default PageList;