import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL !== undefined 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://localhost:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch jobs');
  }
});

export const fetchAppliedJobs = createAsyncThunk('jobs/fetchApplied', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/applications`, getAuthHeaders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch applied jobs');
  }
});

export const createJob = createAsyncThunk('jobs/createJob', async (jobData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData, getAuthHeaders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to create job');
  }
});

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, jobData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/jobs/${id}`, jobData, getAuthHeaders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to update job');
  }
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/jobs/${id}`, getAuthHeaders());
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to delete job');
  }
});

export const applyToJob = createAsyncThunk('jobs/applyToJob', async (id, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/${id}/apply`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to apply to job');
  }
});


const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    appliedJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearJobError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchJobs.fulfilled, (state, action) => { state.loading = false; state.jobs = action.payload; })
      .addCase(fetchJobs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(fetchAppliedJobs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => { state.loading = false; state.appliedJobs = action.payload; })
      .addCase(fetchAppliedJobs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(createJob.fulfilled, (state, action) => { state.jobs.unshift(action.payload); })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => j.id === action.payload.id);
        if(index !== -1) state.jobs[index] = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(j => j.id !== action.payload);
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
         state.appliedJobs.unshift(action.payload);
      });
  }
});

export const { clearJobError } = jobsSlice.actions;
export default jobsSlice.reducer;
