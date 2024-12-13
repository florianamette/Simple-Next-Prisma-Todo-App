"use client";

import { useState, useEffect } from 'react';
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/todos');
      if (!res.ok) {
        console.error('Failed to fetch tasks');
        return;
      }
      const data = await res.json();
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (text: string) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      console.error('Failed to add task');
      return;
    }
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    if (!res.ok) {
      console.error('Failed to update task');
      return;
    }
    const updatedTask = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 200) {
      console.error('Failed to delete task');
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Simple To-Do App</h1>
          <TaskInput onAddTask={addTask} />
          <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
          />
        </div>
      </div>
  );
}