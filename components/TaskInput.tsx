"use client";
import { useState } from 'react';

interface TaskInputProps {
    onAddTask: (task: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
    const [input, setInput] = useState<string>('');

    const handleAddTask = () => {
        if (input.trim() === '') {
            alert('Please enter a task.');
            return;
        }
        onAddTask(input.trim());
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="flex mb-4">
            <input
                type="text"
                className="flex-grow border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Add a new task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleAddTask}
                className="ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
            >
                Add
            </button>
        </div>
    );
};

export default TaskInput;