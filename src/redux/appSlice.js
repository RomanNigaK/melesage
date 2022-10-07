import { createSlice } from '@reduxjs/toolkit'

import { responseData } from '../api/api';



export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoad:false,
    responseData: null,
    quantityPage: [],
    quantityRowsPage: null,
    quantityRowsOnePage: 20,
    currentPage: 1,
    isShowError:false,
    isError:false,
    msgError:null,

    searchFields: ["Наименование", "Количество", "Расстояние"],
    itemsTypeFilter: null,
   
    isInput:false,
    
    request:{
      selectField:null,
      selectTypeFilter:null,
      strSearch:null,
    },
    selectField:null,
    selectTypeFilter:null,


  },
  reducers: {
    setTableData: (state, action) => {
      console.log(action.payload)
      state.responseData = action.payload;
      console.log(state.responseData)
    },
    setQuantityPage: (state, action) => {
      state.quantityPage = [];
      let quantityPage = Math.trunc(action.payload / state.quantityRowsOnePage);

      if (action.payload % state.quantityRowsOnePage) { ++quantityPage }

      for (let i = 1; i <= quantityPage; i++) {
        state.quantityPage.push(i);

      }


    },
    setNewPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFieldFilter: (state, action) => {
      state.selectField = action.payload;
       
      switch (action.payload) {
        case "Наименование":
          state.itemsTypeFilter = ["Равно", "Входит"];
          state.request.selectField='name';
          break;
        case "Количество":
          state.itemsTypeFilter = ["Больше", "Меньше", "Равно"];
          state.request.selectField='quantity';
          break;
        case "Расстояние":
          state.itemsTypeFilter = ["Больше", "Меньше", "Равно"];
          state.request.selectField='distance';
          break;
        default:
          break;
      }
      state.selectTypeFilter=null;
    },
    setTypeFieldFilter:(state,action)=>{
      state.request.selectTypeFilter=action.payload;
      state.selectTypeFilter=action.payload;
      state.isInput=true;
      
    },
    setStrSearch:(state,action)=>{
      state.request.strSearch=action.payload;
    },
    closeMsg:(state)=>{
      state.isShowError=false;
    },
    showMsg:(state,action)=>{
      state.isShowError=true;
      state.msgError=action.payload;
      state.isError=true;
    },
  },
})

export const loadApp = () => async (dispatch) => {
  try {
    const quantity = await responseData.getQuantityRows();
    if(quantity.isSuccess){
      console.log(quantity)
      dispatch(setQuantityPage(quantity.count));
      const data = await responseData.getData(0, 20);
      console.log(data)
      dispatch(setTableData(data));
    }   
  } catch (error) {
    console.log(error);
    dispatch(showMsg(error.message))
  }


}

export const updateDataTable = (body,page) => async (dispatch) => {
  dispatch(setNewPage(page));
  dispatch(setTableData(null));

  const data = await responseData.getSearchData(body,page === 1 ? 0 : (page - 1) * 20, 20);
  dispatch(setTableData(data));

}

export const search = (body)=>async (dispatch)=>{
  const quantity = await responseData.getSearchData(body); 
  console.log(quantity)
  if(quantity.isSuccess){
    console.log(quantity.data.length)
    dispatch(setQuantityPage(quantity.data.length));
    const data = await responseData.getSearchData(body,0,20);
    console.log(data)
    dispatch(setTableData(data));
  }else{
    dispatch(setTableData(quantity));
    dispatch(setQuantityPage(1));
  }
  
  
  
}





export const { setTableData, setQuantityPage, setNewPage,
               setFieldFilter, setTypeFieldFilter, setStrSearch,
               closeMsg,showMsg } = appSlice.actions

export default appSlice.reducer