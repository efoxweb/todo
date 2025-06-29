import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTodos } from '../../features/todosSlice.ts';
import LoadSpinner from '../ui/LoadSpinner.tsx';
import type { AppDispatch, RootState } from '../../store.ts';
import TodoItem from './TodoItem.tsx';
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
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
}

export default TodoList;
