import { useState } from 'react';
import type { FormEvent } from 'react';


type Props = { onAdd: (title: string) => void };


export function TodoForm({ onAdd }: Props) {
    const [title, setTitle] = useState('');


    const submit = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setTitle('');
    };


    return (
        <form onSubmit={submit} className="row" aria-label="Добавить задачу">
            <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Что нужно сделать?"
                aria-label="Название задачи"
                autoFocus
            />
            <button className="btn primary" type="submit" disabled={!title.trim()}>
                Добавить
            </button>
        </form>
    );
}