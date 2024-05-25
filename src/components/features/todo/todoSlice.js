// src/features/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTodosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTodosSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchTodosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createTodoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createTodoSuccess: (state, action) => {
            state.loading = false;
            state.items.push(action.payload);
        },
        createTodoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTodoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateTodoSuccess: (state, action) => {
            state.loading = false;
            const index = state.items.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        updateTodoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTodoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteTodoSuccess: (state, action) => {
            state.loading = false;
            state.items = state.items.filter((todo) => todo.id !== action.payload);
        },
        deleteTodoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    createTodoRequest,
    createTodoSuccess,
    createTodoFailure,
    updateTodoRequest,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;
