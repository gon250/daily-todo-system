'use client'

import {useState, ChangeEvent} from 'react';

interface TodoType {
    text: string;
    done: boolean;
}

export default function TodoList() {
    const [newTodo, setNewTodo] = useState<string>('');
    const [todos, setTodos] = useState<TodoType[]>([]);

    const handleAddNewTodo = (): void => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, {text: newTodo, done: false}]);
            setNewTodo('');
        }
    };

    const handleToggleDone = (index: number): void => {
        const updatedTodos = [...todos];
        updatedTodos[index].done = !updatedTodos[index].done;
        setTodos(updatedTodos);
    };

    const handleKeyPress = (event: React.KeyboardEvent, index: number): void => {
        if (event.key === "Backspace" && todos[index].text === '') {
            const updatedTodos = [...todos];
            updatedTodos.splice(index, 1);
            setTodos(updatedTodos);
        }
    }

    const handleChangeTodoText = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = event.target.value;
        setTodos(updatedTodos);
    };

    const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTodo(e.target.value);
    };

    return (
        <div className="m-10 p-5 bg-gray-200 rounded">
            <div className="mb-5">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleNewTodoChange}
                    className="mr-2 p-2 border-2 border-gray-400 rounded"
                />
                <button onClick={handleAddNewTodo} className="p-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-white rounded m-2">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleToggleDone(index)}
                            className="mr-2"
                        />
                        <input
                            type="text"
                            value={todo.text}
                            onChange={(event) => handleChangeTodoText(event, index)}
                            onKeyDown={(event) => handleKeyPress(event, index)}
                            className={`w-full p-2 border-2 ${todo.done ? 'line-through text-gray-300' : 'border-gray-400'}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
