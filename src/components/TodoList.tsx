import type { Todo } from '../types';
import { TodoItem } from './TodoItem';


type Props = {
    items: Todo[];
    onToggle: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
};


export function TodoList({ items, onToggle, onUpdate, onDelete }: Props) {
    if (items.length === 0) {
        return <p className="muted" role="status">Задач нет — добавьте первую!</p>;
    }


    return (
        <ul className="list">
            {items.map((t) => (
                <TodoItem key={t.id} todo={t} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />)
            )}
        </ul>
    );
}