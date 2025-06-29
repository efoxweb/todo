import TodoList from './components/todos/TodoList.tsx';
import Container from './components/ui/Container.tsx';
import TodoInput from './components/todos/TodoInput.tsx';
import LoadingIndicator from './components/ui/LoadingIndicator.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from './store.ts';

function App() {
    const isAddingTodo = useSelector(
        (state: RootState) => state.todos.isAddingTodo,
    );

    return (
        <>
            <div className={'bg-blue-900 p-4 text-white mb-6'}>
                <Container>
                    <h1 className={'font-bold'}>Rick's TO-DO List</h1>
                </Container>
            </div>
            <Container>
                <TodoInput />
                <TodoList />
                {isAddingTodo && (
                    <div className={'h-4 my-4'}>
                        <LoadingIndicator />
                    </div>
                )}
            </Container>
        </>
    );
}

export default App;
