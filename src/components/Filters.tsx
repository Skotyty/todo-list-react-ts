import { Filter } from '../types';


type Props = {
    active: Filter;
    onChange: (f: Filter) => void;
};


const FILTERS: { key: Filter; label: string }[] = [
    { key: Filter.All, label: 'Все' },
    { key: Filter.Active, label: 'Активные' },
    { key: Filter.Completed, label: 'Выполненные' },
];


export function Filters({ active, onChange }: Props) {
    return (
        <div className="filters" role="tablist" aria-label="Фильтры задач">
            {FILTERS.map((f) => (
                <button
                    key={f.key}
                    role="tab"
                    aria-selected={active === f.key}
                    className={"filter-btn" + (active === f.key ? " active" : "")}
                    onClick={() => onChange(f.key)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}