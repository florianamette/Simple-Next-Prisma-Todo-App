"use client";
import React from "react";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={onToggle}
                    className="mr-2"
                />
                <span
                    className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                >
          {task.text}
        </span>
            </div>
            <button
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1"
            >
                Delete
            </button>
        </li>
    );
};

export default TaskItem;