import { createSlice } from "@reduxjs/toolkit";

export const dataReducer = createSlice({
  name: "dataReducer",
  initialState: {
    /* inventory form states */
    openOrders: '',
    onHand: '',
    order_:'',
    adjustedOrder:'',
    adjustedPar: '',
    case_: '',
    lbs: '',
    bag: '',
    tray: '',
    ea: '',
    oz: '',
    gal: '',
    sleeves: '',
    totalCases: '',
    sales:'',
    yield:'',
  /**************************/
    dates: null,
    requestedData: null,
    requestedLocations: null,
    selectedLocation:null,
    selectedData: null,
    selectedDate: null,
    instruction: "PLEASE SELECT A DATE",
    toastMessage: ""
  },
  reducers: {
    changeDetailedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearSelectedData:(state, action) => {
      state.selectedData = ""
    },
    updateDataForSelectedDate: (state, action) => {
      const distinct=(value, index,self)=>{
        return self.indexOf(value)==index;
      }
      let requestedData = action.payload.requestedData;
      let locations = requestedData.map(array=>array.location_)
      let uniqueLocations = locations.filter(distinct)
      uniqueLocations.push('ALL LOCATIONS')
      state.requestedLocations = uniqueLocations
      state.requestedData = action.payload.requestedData;
      state.selectedDate = action.payload.selectedDate;
    },
    createDatesArray: (state, action) => {
      let dates_array = [];
      for (const [key, value] of Object.entries(action.payload)) {
        dates_array.push(new Date(value["date"]));
      }
      dates_array.sort();
      state.dates = dates_array;
    },
    updateData: (state, action) => {
      state.selectedData = action.payload;
      state.order_ = action.payload.system_par;
    },
    setOpenOrders: (state, action) => {
      state.openOrders = action.payload;
    },
    setOnHand: (state, action) => {
      state.onHand = action.payload;
    },
    setCase_: (state, action) => {
      state.case_ = action.payload;
    },
    setTotalCases: (state, action) => {
      state.totalCases = action.payload;
    },
    setAdjustedPar: (state, action) => {
      state.adjustedPar = action.payload;
    },
    setLbs: (state, action) => {
      state.lbs = action.payload;
    },
    setBag: (state, action) => {
      state.bag = action.payload;
    },
    setTray: (state, action) => {
      state.tray = action.payload;
    },
    setEa: (state, action) => {
      state.ea = action.payload;
    },
    setOz: (state, action) => {
      state.oz = action.payload;
    },
    setGal: (state, action) => {
      state.gal = action.payload;
    },
    setSleeves: (state, action) => {
      state.sleeves = action.payload;
    },
    setOrder:(state,action) =>{
      state.order_ = action.payload;
    },
    setAdjustedOrder:(state,action) =>{
      state.adjustedOrder = action.payload;
    },
    setSales:(state,action) =>{
      state.sales = action.payload;
    },
    setYield:(state,action) => {
      state.yield = action.payload;
    },
    setSelectedLocation:(state,action) =>{
      state.selectedLocation = action.payload
    },
    setInstructions:(state,action) =>{
      state.instruction = action.payload;
    },
    setSelectedData:(state,action) =>{
      state.selectedData = action.payload;
    },
    refetchUpdatedData:(state,action) =>{
      state.requestedData = action.payload
    },
    updateToastMessage:(state,action) => {
      state.toastMessage = action.payload
      console.log("dataReducer: ",state.toastMessage);
    }

  },
});

// Action creators are generated for each case reducer function
export const {
  changeDetailedDate,
  updateData,
  createDatesArray,
  updateDataForSelectedDate,
  setOpenOrders,
  setCase_,
  setAdjustedPar,
  setBag,
  setEa,
  setGal,
  setLbs,
  setOnHand,
  setOz,
  setSleeves,
  setTotalCases,
  setTray,
  setOrder,
  setAdjustedOrder,
  setSales,
  setYield,
  setSelectedLocation,
  setInstructions,
  refetchUpdatedData,
  setSelectedData,
  updateToastMessage,
  clearSelectedData
} = dataReducer.actions;


export default dataReducer.reducer;
