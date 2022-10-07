import logo from './logo.svg';
import style from './App.module.css';
import Table from './components/table/Table';
import Filters from './components/filters/Filters';
import PageList from './components/pageList/PageList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadApp, closeMsg } from './redux/appSlice';
import Preloader from './components/common/preloader/Preloader';



function App() {

  const data = useSelector((state) => state.app.responseData);

  const page = useSelector((state) => state.app.currentPage);
  const quantityPage = useSelector((state) => state.app.quantityPage);
  const quantityRowsOnePage = useSelector((state) => state.app.quantityRowsOnePage);
  const isShowError = useSelector((state) => state.app.isShowError);
  const paramsFilter = useSelector((state) => state.app.searchFields);
  const msgError = useSelector((state) => state.app.msgError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadApp())
  }, [])

  function hideMsg() {
    dispatch(closeMsg())
  }
  return (
    <div className={style.App}>
      {isShowError ? <div className={style.msg}>
        <div className={style.close} onClick={hideMsg}></div>
        <div className={style.textMsg}>
          {msgError}
        </div>
      </div> : ''}
      <div>
        {data ? <Filters paramsFilter={paramsFilter} /> : null}
        {data ? <Table data={data} /> : <Preloader />}
        <PageList page={page} quantityPage={quantityPage} quantityRowsOnePage={quantityRowsOnePage} />
      </div>
    </div>
  );
}

export default App;
