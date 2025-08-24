import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice.js';
import tasksReducer from './features/tasks/tasksSlice.js';

export default configureStore({
  reducer: { auth: authReducer, tasks: tasksReducer },
});
