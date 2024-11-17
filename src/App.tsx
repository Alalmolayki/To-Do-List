import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, XCircle, Calendar, Home, Briefcase, ShoppingCart } from 'lucide-react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  category: 'ev' | 'iş' | 'alışveriş';
};

const categoryIcons = {
  ev: <Home className="w-5 h-5" />,
  iş: <Briefcase className="w-5 h-5" />,
  alışveriş: <ShoppingCart className="w-5 h-5" />
};

const categoryColors = {
  ev: 'bg-blue-100 text-blue-800',
  iş: 'bg-purple-100 text-purple-800',
  alışveriş: 'bg-green-100 text-green-800'
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ev' | 'iş' | 'alışveriş'>('ev');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          category: selectedCategory
        }
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Günlük Görevlerim</h1>
          </div>
          
          <p className="text-gray-600 mb-6">{today}</p>

          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2 mb-4">
              {(['ev', 'iş', 'alışveriş'] as const).map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                    ${selectedCategory === category ? categoryColors[category] : 'bg-gray-100 text-gray-600'}`}
                >
                  {categoryIcons[category]}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Yeni görev ekle..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Ekle
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors
                  ${task.completed ? 'bg-gray-50 border-gray-200' : `${categoryColors[task.category]} border-transparent`}`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <CheckCircle2 className={`w-6 h-6 ${task.completed ? 'text-green-600' : ''}`} />
                  </button>
                  <span className="flex items-center gap-2">
                    {categoryIcons[task.category]}
                    <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                      {task.text}
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Henüz görev eklenmemiş. Yeni bir görev ekleyerek başlayın!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;