import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store.ts';
import { addTodo } from '../../features/todosSlice.ts';
import Button from '../ui/Button.tsx';
function TodoInput() {
    const [text, setText] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const isAddingTodo = useSelector(
        (state: RootState) => state.todos.isAddingTodo,
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isAddingTodo) {
            return;
        }
        const trimmed = text.trim();
        if (!trimmed) return;
        try {
            await dispatch(addTodo(trimmed)).unwrap();
            setText('');
        } catch (err) {
            console.error('Failed to add todo:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isAddingTodo}
                placeholder="Add a new todo"
                className="flex-grow px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
            <Button onClick={handleSubmit} disabled={isAddingTodo}>
                Add
            </Button>
        </form>
    );
}

export default TodoInput;
