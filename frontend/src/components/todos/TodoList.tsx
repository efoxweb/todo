import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTodos } from '../../features/todosSlice.ts';
import LoadSpinner from '../ui/LoadSpinner.tsx';
import type { AppDispatch, RootState } from '../../store.ts';
import ErrorNotice from '../ui/ErrorNotice.tsx';

function TodoList() {
    const dispatch: AppDispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.items);
    const loading = useSelector((state: RootState) => state.todos.loading);
    const error = useSelector((state: RootState) => state.todos.error);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if (loading) return <LoadSpinner />;
    if (error) return <ErrorNotice>Error: {error}</ErrorNotice>;

    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.title} {todo.completed ? '✔️' : ''}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
