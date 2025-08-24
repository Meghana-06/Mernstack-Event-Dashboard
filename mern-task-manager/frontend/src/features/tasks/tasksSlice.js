import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios.js';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
  try {
    const res = await api.get('/api/tasks');
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
  }
});

export const addTask = createAsyncThunk('tasks/add', async (data, thunkAPI) => {
  try {
    const res = await api.post('/api/tasks', data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/api/tasks/${id}`, data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/api/tasks/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchTasks.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchTasks.rejected, (s, { payload }) => { s.loading = false; s.error = payload; })
      .addCase(addTask.fulfilled, (s, { payload }) => { s.items.unshift(payload); })
      .addCase(updateTask.fulfilled, (s, { payload }) => {
        const i = s.items.findIndex((t) => t._id === payload._id);
        if (i !== -1) s.items[i] = payload;
      })
      .addCase(deleteTask.fulfilled, (s, { payload }) => {
        s.items = s.items.filter((t) => t._id !== payload);
      });
  }
});

export default slice.reducer;
