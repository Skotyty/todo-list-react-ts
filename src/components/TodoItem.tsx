import { useEffect, useRef, useState } from 'react';
import type { Todo } from '../types';


type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
};


export function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(todo.title);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (isEditing) inputRef.current?.focus();
    }, [isEditing]);


    const commit = () => {
        const t = draft.trim();
        if (t && t !== todo.title) onUpdate(todo.id, t);
        setIsEditing(false);
        setDraft(t || todo.title);
    };


    return (
        <li className="item">
            <input
                className="checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                aria-label={todo.completed ? 'Снять отметку' : 'Отметить выполненной'}
            />


            <div>
                <input
                    ref={inputRef}
                    className={"title-input" + (isEditing ? " editable" : "")}
                    value={isEditing ? draft : todo.title}
                    readOnly={!isEditing}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') commit();
                        if (e.key === 'Escape') {
                            setIsEditing(false);
                            setDraft(todo.title);
                        }
                    }}
                />


                <div className="meta">
                    <span className="badge">{new Date(todo.createdAt).toLocaleDateString()}</span>
                    {todo.completed && <span className="badge">Готово</span>}
                </div>
            </div>


            <div>
                <button className="icon-btn" aria-label="Редактировать" onClick={() => setIsEditing((v) => !v)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width="20"
                        height="20"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </button>
                <button className="icon-btn danger" aria-label="Удалить" onClick={() => onDelete(todo.id)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width="20"
                        height="20"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        </li>
    );
}