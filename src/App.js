import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import { Plus, Sparkles } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Build 3D Task App', description: 'Create dark theme glassmorphism UI with hover effects.', priority: 'High', completed: false, dueDate: 'Today', category: 'Dev' },
      { id: 2, title: 'Setup Vercel Hosting', description: 'Deploy live project for instant browser search access.', priority: 'Medium', completed: false, dueDate: 'Tomorrow', category: 'Deploy' }
    ];
  });

  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium', category: 'Dev', dueDate: '' });

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setTasks([{ ...newTask, id: Date.now(), completed: false }, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'Medium', category: 'Dev', dueDate: '' });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white p-8">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
            TaskFlow 3D <Sparkles className="text-cyan-400" />
          </h1>
          <p className="text-gray-400 mt-1">Ultra Modern Interactive Workspace</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={addTask} className="p-6 rounded-2xl bg-gray-900/40 border border-white/10 backdrop-blur-md h-fit space-y-4">
          <h2 className="text-xl font-bold text-cyan-400 mb-2">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Title..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
          />
          <textarea
            placeholder="Description..."
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full bg-gray-800/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500 h-24 text-white"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="bg-gray-800/50 border border-white/10 rounded-xl p-3 text-sm text-gray-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="bg-gray-800/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-white">
            <Plus className="w-5 h-5" /> Create Task
          </button>
        </form>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;