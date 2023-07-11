import { createSlice } from '@reduxjs/toolkit'

export const uiReducer = createSlice({
  name: 'uiReducer',
  initialState: {
    detailedTab:false,
    tableTab:false,
    visualizationTab:false,
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
  },
})

// Action creators are generated for each case reducer function
export const {changeDetailedTab, changeTableTab, changeVisualizationTab} = uiReducer.actions

export default uiReducer.reducer