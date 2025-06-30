import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../../../features/todosSlice';
import todosApi from '../../../api/todos.ts';
import TodoInput from '../../../components/todos/TodoInput.tsx';
import { Todo } from '../../../types/todo.ts';

function renderWithStore(preloadedState = {}) {
    const store = configureStore({
        reducer: { todos: todosReducer },
        preloadedState,
    });

    return render(
        <Provider store={store}>
            <TodoInput />
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

describe('TodoInput', () => {
    it('adds a new todo', async () => {
        renderWithStore();

        const input = screen.getByPlaceholderText(
            'Add a new todo',
        ) as HTMLInputElement;
        const button = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: '  New task  ' } });

        (todosApi.create as jest.Mock).mockResolvedValue({
            ...mockTodo,
            title: 'New task',
        });

        fireEvent.click(button);

        await waitFor(() => {
            expect(todosApi.create).toHaveBeenCalledWith('New task');
        });

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });

    it('logs error if api call responds with an error', async () => {
        const error = new Error('Failed');

        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        (todosApi.create as jest.Mock).mockRejectedValue(error);

        renderWithStore();

        const input = screen.getByPlaceholderText('Add a new todo');
        const button = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: '  New task  ' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                'Failed to add todo:',
                expect.objectContaining({ message: 'Failed' }),
            );
        });

        consoleSpy.mockRestore();
    });
});
