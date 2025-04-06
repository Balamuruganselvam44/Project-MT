import { createSlice, createAsyncThunk,createSelector  } from '@reduxjs/toolkit';

// Create async thunk for fetching countries
export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { getState }) => {
    const { countries } = getState();
    if (countries.status === 'succeeded') {
      return countries.data;
    }
    
    const response = await fetch(
      'https://restcountries.com/v2/all?fields=name,region,flag'
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: 'All',
    displayCount: 12
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    incrementDisplayCount: (state) => {
      state.displayCount += 12;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setFilter, incrementDisplayCount } = countrySlice.actions;

// Selector to get filtered countries
export const selectFilteredCountries = createSelector(
  [
    state => state.countries.filter,
    state => state.countries.data,
    state => state.countries.displayCount
  ],
  (filter, countries, displayCount) => {
    let filteredCountries = filter === 'All' 
      ? countries 
      : countries.filter(country => country.region === filter);
    
    return filteredCountries.slice(0, displayCount);
  }
);
export default countrySlice.reducer;
