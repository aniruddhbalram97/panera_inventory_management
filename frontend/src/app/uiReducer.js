import { createSlice } from '@reduxjs/toolkit'

export const uiReducer = createSlice({
  name: 'uiReducer',
  initialState: {
    detailedTab:false,
    tableTab:false,
    visualizationTab:false,
    auth:"login",
    infoMessage:false,
  },
  reducers: {
    changeDetailedTab: (state) => {
      state.detailedTab = true;
      state.tableTab = false;
      state.visualizationTab = false;
    },
    changeTableTab: (state) => {
        state.detailedTab = false;
        state.tableTab = true;
        state.visualizationTab = false;
    },
    changeVisualizationTab: (state) => {
        state.detailedTab = false;
        state.tableTab = false;
        state.visualizationTab = true;
    },
    toggleAuth:(state,action) =>{
      state.auth = action.payload 
    },
    setInfoMessage:(state, action) =>{
      state.infoMessage = action.payload
    },
    resetUiState:(state,action) =>{
      state.detailedTab=false
      state.tableTab=false
      state.visualizationTab=false
      state.auth="register"
      state.infoMessage=false
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeDetailedTab, changeTableTab, changeVisualizationTab, toggleAuth, setInfoMessage, resetUiState} = uiReducer.actions

export default uiReducer.reducer