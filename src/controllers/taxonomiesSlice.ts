import {
  CreateSliceOptions,
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Taxonomy } from '@/model/Taxonomy';

interface TaxonomiesState {
  taxonomiesLoading: boolean;
  taxonomiesError: Error | null;
  taxonomiesErrorMessage: string;
  taxonomiesStatusCode: string;
}

const initialState: TaxonomiesState = {
  taxonomiesLoading: false,
  taxonomiesError: null,
  taxonomiesErrorMessage: '',
  taxonomiesStatusCode: '',
};

const taxonomiesSliceOptions: CreateSliceOptions<TaxonomiesState> = {
  name: 'taxonomies',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
  },
};

export const taxonomiesSlice = createSlice(taxonomiesSliceOptions);
export const { setPortfolioSkills } = taxonomiesSlice.actions;