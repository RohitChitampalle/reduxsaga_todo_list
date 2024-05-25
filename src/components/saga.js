// src/sagas.js
import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './features/todo/todoSlice';

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Fetch todos
function* fetchTodos() {
    try {
        const response = yield call(axios.get, apiUrl);
        yield put(fetchTodosSuccess(response.data));
    } catch (error) {
        yield put(fetchTodosFailure(error.message));
    }
}

// Create a new todo
function* createTodo(action) {
    try {
        const response = yield call(axios.post, apiUrl, action.payload);
        yield put(createTodoSuccess(response.data));
    } catch (error) {
        yield put(createTodoFailure(error.message));
    }
}

// Update a todo
function* updateTodo(action) {
    try {
        const response = yield call(axios.put, `${apiUrl}/${action.payload.id}`, action.payload);
        yield put(updateTodoSuccess(response.data));
    } catch (error) {
        yield put(updateTodoFailure(error.message));
    }
}

// Delete a todo
function* deleteTodo(action) {
    try {
        yield call(axios.delete, `${apiUrl}/${action.payload}`);
        yield put(deleteTodoSuccess(action.payload));
    } catch (error) {
        yield put(deleteTodoFailure(error.message));
    }
}

function* watchTodoActions() {
    yield takeEvery(fetchTodosRequest.type, fetchTodos);
    yield takeEvery(createTodoRequest.type, createTodo);
    yield takeEvery(updateTodoRequest.type, updateTodo);
    yield takeEvery(deleteTodoRequest.type, deleteTodo);
}

export default function* rootSaga() {
    yield all([watchTodoActions()]);
}
