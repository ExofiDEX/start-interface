import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from 'app/state'

import { RampModalView } from './enum'

export interface RampState {
  view?: RampModalView
  open: boolean
}

const initialState: RampState = {
  view: RampModalView.Buy,
  open: true,
}

export const rampSlice = createSlice({
  name: 'ramp',
  initialState,
  reducers: {
    setRampModalView: (state, action: PayloadAction<RampModalView | undefined>) => {
      state.view = action.payload
    },
    setRampModalOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setRampModalState: (state, action: PayloadAction<{ view: RampModalView; open: boolean }>) => {
      state.view = action.payload.view
      state.open = action.payload.open
    },
  },
})

export const { setRampModalView, setRampModalOpen, setRampModalState } = rampSlice.actions

type selectRamp = (state: AppState) => RampState
export const selectRamp: selectRamp = (state: AppState) => state.ramp
export default rampSlice.reducer
