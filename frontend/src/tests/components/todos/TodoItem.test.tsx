import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoItem from '../../../components/todos/TodoItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../../../features/todosSlice';
import { Todo } from '../../../types/todo.ts';
import todosApi from '../../../api/todos.ts';

function renderWithStore(todo: Todo, preloadedState = {}) {
    const store = configureStore({
        reducer: {
            todos: todosReducer,
        },
        preloadedState,
    });
    return render(
        <Provider store={store}>
            <TodoItem {...todo} />
        </Provider>,
    );
}

const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    created_at: '',
    updated_at: '',
};

jest.mock('../../../api/todos');

describe('TodoItem', () => {
    it('renders the todo item correctly', () => {
        renderWithStore(mockTodo);
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByText('◻️')).toBeInTheDocument();
        expect(screen.getByText('Remove')).toBeInTheDocument();
    });
    it('calls markComplete endpoint on toggle when not completed', async () => {
        (todosApi.markComplete as jest.Mock).mockResolvedValue({
            ...mockTodo,
            completed: true,
        });

        renderWithStore(mockTodo);

        const toggleButton = screen.getByRole('button', { name: /test todo/i });
        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(todosApi.markComplete).toHaveBeenCalledWith(1);
        });
    });

    it('calls markIncomplete endpoint on toggle when already completed', async () => {
        (todosApi.markIncomplete as jest.Mock).mockResolvedValue({
            ...mockTodo,
            completed: false,
        });

        const completedTodo = { ...mockTodo, completed: true };

        renderWithStore(completedTodo);

        const toggleButton = screen.getByRole('button', { name: /test todo/i });
        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(todosApi.markIncomplete).toHaveBeenCalledWith(1);
        });
    });

    it('calls delete endpoint on remove button click', async () => {
        (todosApi.delete as jest.Mock).mockResolvedValue({});

        renderWithStore(mockTodo);

        const removeButton = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(todosApi.delete).toHaveBeenCalledWith(1);
        });
    });
});
