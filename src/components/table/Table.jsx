import React from "react";
import style from './style.module.css';

const Table = (props) => {
  const tableHeader = <div className={style.row}>
    <div className={style.itemRow}>
      Дата
    </div>
    <div className={style.itemRow}>
      Название
    </div>
    <div className={style.itemRow}>
      Количество(л.)
    </div>
    <div className={style.itemRow}>
      Растояние
    </div>
  </div>


  if (!props.data.isSuccess) {
    return (
      <>
        {tableHeader}
        {props.data.message}
      </>
    )
  }
  let result = props.data.data.map(el => {
    return <div className={style.row}>
      <div className={style.itemRow}>
        {el.data.slice(0, 10)}
      </div>
      <div className={style.itemRow}>
        {el.name}
      </div>
      <div className={style.itemRow}>
        {el.quantity}
      </div>
      <div className={style.itemRow}>
        {el.distance}
      </div>
    </div>
  })

  return (
    <>
      {tableHeader}
      {result}
    </>
  )
}

export default Table;