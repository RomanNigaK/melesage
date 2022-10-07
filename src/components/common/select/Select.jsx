import React, { useState } from "react";
import style from './style.module.css';
import { useDispatch } from 'react-redux'


const Select = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);
    const [isDisplay, setIsDisplay] = useState(false);

    let listOption = props.options.map(el => {
        return <div className={style.item} onClick={() => { selectItem(el) }}>{el}</div>
    })

    function overMouse() {
        setIsDisplay(true)
    }
    function outMose() {
        setIsDisplay(false)
    }
    function selectItem(item) {
        setValue(item);
        setIsDisplay(false);
        dispatch(props.dispatch(item));
    }


    return (
        <div className={style.select} onMouseOver={overMouse} onMouseOut={outMose}>
            {value ? value : props.default}
            {isDisplay ?
                <div className={style.items}>
                    {listOption}
                </div> : ''
            }
        </div>
    )

};
export default Select;