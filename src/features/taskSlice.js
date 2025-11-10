import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";
const userId = localStorage.getItem("userId");

// CREATE
export const createTask = createAsyncThunk("tasks/create", async (data) => {
  const newTask = { ...data, userId };
  const res = await axios.post(API_URL, newTask);
  return res.data;
});

// READ
export const viewTask = createAsyncThunk("tasks/view", async () => {
  const res = await axios.get(API_URL);
  return res.data.filter((t) => t.userId === localStorage.getItem("userId"));
});

// DELETE
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// UPDATE
export const updateTask = createAsyncThunk("tasks/update", async (data) => {
  const res = await axios.put(`${API_URL}/${data.id}`, data);
  return res.data;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.taskList.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.taskList = state.taskList.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.taskList.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.taskList[index] = action.payload;
      });
  },
});

export default taskSlice.reducer;
