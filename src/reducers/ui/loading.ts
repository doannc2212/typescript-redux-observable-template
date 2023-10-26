import { createSlice } from '@reduxjs/toolkit';

type TState = {
  counter: number;
  isLoading: boolean;
};

const initialState: TState = {
  counter: 0,
  isLoading: false,
};

const _module = createSlice({
  name: '[store/ui]/loading',
  initialState,
  reducers: {
    on(state: TState) {
      const counter = state.counter + 1;
      return { ...state, counter, isLoading: true };
    },
    off(state: TState) {
      const counter = state.counter > 0 ? state.counter - 1 : 0;
      const isOff = counter <= 0;
      return { ...state, counter, isLoading: !isOff };
    },
    stop() {
      return initialState;
    },
  },
});

export const loadingModule = _module;
