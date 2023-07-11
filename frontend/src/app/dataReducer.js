import { createSlice } from '@reduxjs/toolkit'

export const dataReducer = createSlice({
  name: 'dataReducer',
  initialState: {
    date:null,
    selectedData: null,
  },
  reducers: {
    changeDetailedDate: (state, action) => {
        state.date = action.payload;
    },
    updateData: (state, action) =>{
      state.selectedData = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeDetailedDate, updateData} = dataReducer.actions

export default dataReducer.reducer