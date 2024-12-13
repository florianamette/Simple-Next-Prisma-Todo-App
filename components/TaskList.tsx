"use client";
import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (taskId: number) => void;
    onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                />
            ))}
        </ul>
    );
};

export default TaskList;