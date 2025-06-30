import { render, screen, waitFor } from '@testing-library/react';
import { Todo } from '../../../types/todo.ts';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../../../features/todosSlice';
import { Provider } from 'react-redux';
import TodoList from '../../../components/todos/TodoList.tsx';
import todosApi from '../../../api/todos.ts';

jest.mock('../../../api/todos');
function renderWithStore(preloadedState = {}) {
    const store = configureStore({
        reducer: { todos: todosReducer },
        preloadedState,
    });

    return render(
        <Provider store={store}>
            <TodoList />
        </Provider>,
    );
}

const mockTodos: Todo[] = [
    {
        id: 1,
        title: 'First Todo',
        completed: false,
        created_at: '',
        updated_at: '',
    },
    {
        id: 2,
        title: 'Second Todo',
        completed: true,
        created_at: '',
        updated_at: '',
    },
];

describe('TodoList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('gets all todos and displays items on success', async () => {
        (todosApi.getAll as jest.Mock).mockResolvedValue(mockTodos);

        renderWithStore();

        await waitFor(() => {
            expect(screen.getByText('First Todo')).toBeInTheDocument();
            expect(screen.getByText('Second Todo')).toBeInTheDocument();
        });

        expect(todosApi.getAll).toHaveBeenCalled();
    });

    it('shows error message on fetch failure', async () => {
        (todosApi.getAll as jest.Mock).mockRejectedValue(
            new Error('Network error'),
        );

        renderWithStore();

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
            expect(screen.getByText(/network error/i)).toBeInTheDocument();
        });
    });
});
