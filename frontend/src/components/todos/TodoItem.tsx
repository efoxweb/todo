import type { Todo } from '../../types/todo.ts';
import { type HTMLProps, useState } from 'react';
import type { AppDispatch } from '../../store.ts';
import { useDispatch } from 'react-redux';
import {
    deleteTodo,
    markTodoCompleted,
    markTodoIncomplete,
} from '../../features/todosSlice.ts';
import LoadingIndicator from '../ui/LoadingIndicator.tsx';
import Button from '../ui/Button.tsx';

interface TodoItemProps
    extends Omit<HTMLProps<HTMLLIElement>, keyof Todo>,
        Todo {}

function TodoItem({
    id,
    title,
    completed,
    className,
    created_at,
    updated_at,
    ...props
}: TodoItemProps) {
    const dispatch: AppDispatch = useDispatch();
    const [isActioning, setIsActioning] = useState(false);

    const handleToggleItem = async () => {
        setIsActioning(true);
        try {
            await dispatch(
                completed ? markTodoIncomplete(id) : markTodoCompleted(id),
            ).unwrap();
        } catch (error) {
            console.error('Failed to mark todo:', error);
        } finally {
            setIsActioning(false);
        }
    };

    const handleDeleteItem = async () => {
        setIsActioning(true);
        try {
            await dispatch(deleteTodo(id)).unwrap();
        } catch (error) {
            console.error('Failed to delete todo:', error);
        } finally {
            setIsActioning(false);
        }
    };

    let cssClassName = 'border-2 hover:border-gray-600 mb-1 flex h-14';

    cssClassName += completed
        ? ' bg-gray-100 border-gray-300 text-gray-500'
        : ' border-orange-200 text-gray-900';

    if (className) {
        cssClassName += ` ${className}`;
    }

    if (isActioning) {
        return (
            <li {...props} className={cssClassName}>
                <LoadingIndicator />
            </li>
        );
    }

    return (
        <li {...props} className={cssClassName}>
            <div className={'grow'}>
                <button
                    onClick={async (event) => {
                        event.preventDefault();
                        await handleToggleItem();
                    }}
                    className={`px-4 h-full cursor-pointer w-full text-left`}
                >
                    <div className={'flex items-center justify-between'}>
                        <span className={`${completed ? 'line-through' : ''}`}>
                            {title}
                        </span>
                        <div className={'pr-2'}>{completed ? '☑️' : '◻️'}</div>
                    </div>
                </button>
            </div>
            <div className={'shrink-0 flex items-center pr-2'}>
                <Button
                    btnStyle={'outlined'}
                    onClick={async (event) => {
                        event.preventDefault();
                        await handleDeleteItem();
                    }}
                >
                    <span className={'text-xs text-red-900'}>Remove</span>
                </Button>
            </div>
        </li>
    );
}

export default TodoItem;
