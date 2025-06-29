import api from './client.ts';
import type { Todo } from '../types/todo.ts';

const todosApi = {
    getAll: async (): Promise<Todo[]> => {
        return await api.get('/todos');
    },
    create: async (title: string): Promise<Todo> => {
        return await api.post('/todos', { title });
    },
    markComplete: async (id: number): Promise<Todo> => {
        return await api.patch(`/todos/${id}/complete`);
    },
    markIncomplete: async (id: number): Promise<Todo> => {
        return await api.patch(`/todos/${id}/incomplete`);
    },
    delete: async (id: number): Promise<void> => {
        return await api.delete(`/todos/${id}`);
    },
};

export default todosApi;
