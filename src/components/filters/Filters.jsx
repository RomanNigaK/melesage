import React, { useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.css';
import { setFieldFilter, setTypeFieldFilter, setStrSearch, showMsg, search } from "../../redux/appSlice";
import Select from "../common/select/Select";

const Filters = (props) => {
    const paramsFilter = useSelector((state) => state.app.searchFields);
    const selectField = useSelector((state) => state.app.selectField);
    const selectTypeFilter = useSelector((state) => state.app.selectTypeFilter);
    const itemsTypeFilter = useSelector((state) => state.app.itemsTypeFilter);
    const isInput = useSelector((state) => state.app.isInput);
    const request = useSelector((state) => state.app.request);
    const dispatch = useDispatch();

    function enterValue(e) {
        dispatch(setStrSearch(e.target.value))
    }

    function sendRequest() {
        if (!request.strSearch) {
            dispatch(showMsg("Пустое значение"))
        } else {
            dispatch(search(request));
            console.log(request)
        }
    }


    return (
        <div className={style.content}>
            <Select options={paramsFilter} default={selectField ?? 'Поле'} dispatch={setFieldFilter} />
            {itemsTypeFilter ? <Select options={itemsTypeFilter} default={selectTypeFilter ?? 'Условие'} dispatch={setTypeFieldFilter} /> : ''}
            {isInput ?
                <div className={style.inputBtn}>
                    <input type="text" placeholder="Введите значение" onChange={enterValue} value={request.strSearch ? request.strSearch : ''} />
                    <div className={style.btn} onClick={sendRequest}>Найти</div>
                </div> : ''}
            <br />
        </div>
    )
}
export default Filters;