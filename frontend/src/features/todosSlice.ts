import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from '@reduxjs/toolkit';
import todosApi from '../api/todos.ts';
import type { Todo } from '../types/todo.ts';

interface TodosState {
    items: Todo[];
    loading: boolean;
    isAddingTodo: boolean;
    error: string | null;
}

const initialState: TodosState = {
    items: [],
    isAddingTodo: false;
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk<Todo[], void>(
    'todos/fetchTodos',
    async () => {
        return await todosApi.getAll();
    },
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (title: string) => {
        return await todosApi.create(title);
    },
);

export const markTodoCompleted = createAsyncThunk(
    'todos/markTodoCompleted',
    async (id: number) => {
        return await todosApi.markComplete(id);
    },
);

export const markTodoIncomplete = createAsyncThunk(
    'todos/markTodoIncomplete',
    async (id: number) => {
        return await todosApi.markIncomplete(id);
    },
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number) => {
        await todosApi.delete(id);
        return id;
    },
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.pending, (state) => {
                state.isAddingTodo = true;
            })
            .addCase(
                fetchTodos.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    state.items = action.payload;
                    state.loading = false;
                },
            )
            .addCase(
                fetchTodos.rejected,
                (state, action: PayloadAction<Todo[]>) => {
                    state.loading = false;
                    state.error = action.error.message;
                },
            )
            .addCase(
                addTodo.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    state.items.push(action.payload);
                },
            )
            .addCase(
                markTodoCompleted.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    const index = state.items.findIndex(
                        (todo) => todo.id === action.payload.id,
                    );
                    if (index !== -1) state.items[index] = action.payload;
                },
            )
            .addCase(
                markTodoIncomplete.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    const index = state.items.findIndex(
                        (todo) => todo.id === action.payload.id,
                    );
                    if (index !== -1) state.items[index] = action.payload;
                },
            )
            .addCase(
                deleteTodo.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    state.items = state.items.filter(
                        (todo) => todo.id !== action.payload,
                    );
                },
            );
    },
});

export default todosSlice.reducer;
