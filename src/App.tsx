import { useMemo, useState, useEffect } from 'react';
import './styles.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Filters } from './components/Filters';
import type { Todo } from './types';
import { Filter } from './types';

const STORAGE_KEY = 'todo:list:v1';
const THEME_KEY = 'todo:theme';

export default function App() {
    const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
        THEME_KEY,
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const filtered = useMemo(() => {
        switch (filter) {
            case Filter.Active:
                return todos.filter((t) => !t.completed);
            case Filter.Completed:
                return todos.filter((t) => t.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    const activeCount = useMemo(
        () => todos.filter((t) => !t.completed).length,
        [todos]
    );

    const add = (title: string) => {
        setTodos((prev) => [
            { id: crypto.randomUUID(), title, completed: false, createdAt: Date.now() },
            ...prev,
        ]);
    };

    const toggle = (id: string) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const update = (id: string, title: string) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, title } : t))
        );
    };

    const remove = (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.completed));
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">
                    Список задач <span className="muted">Осталось: {activeCount}</span>
                </h1>

                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </header>


            <TodoForm onAdd={add} />

            <div className="toolbar">
                <Filters active={filter} onChange={setFilter} />
                <button
                    className="btn ghost"
                    onClick={clearCompleted}
                    disabled={todos.every((t) => !t.completed)}
                >
                    Очистить выполненные
                </button>
            </div>

            <TodoList
                items={filtered}
                onToggle={toggle}
                onUpdate={update}
                onDelete={remove}
            />
        </div>
    );
}
