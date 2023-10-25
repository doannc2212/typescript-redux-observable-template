import { TAuthState, TAuthStatePayload } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TAuthState = {
  isLoading: false,
  data: null,
  error: null,
};

const _module = createSlice({
  name: '[store/authenticate]',
  initialState,
  reducers: {
    save(state: TAuthState, action: PayloadAction<TAuthStatePayload>) {
      return { ...state, ...action.payload };
    },
    startLoading(state: TAuthState) {
      return { ...state, isLoading: true };
    },
    stopLoading(state: TAuthState) {
      return { ...state, isLoading: false };
    },
    clear() {
      return initialState;
    },
  },
});

export const authModule = _module;
