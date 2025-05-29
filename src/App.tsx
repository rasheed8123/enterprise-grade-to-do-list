import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskTable from './components/TaskTable';
import { TranscriptParser } from './components/TranscriptParser';
import { Tabs } from './components/Tabs';
import { ClipboardList, FileText, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const tabs = [
    {
      id: 'single-task',
      label: 'Add Single Task',
      icon: <ListTodo className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <TaskInput />
        </div>
      ),
    },
    {
      id: 'transcript',
      label: 'Meeting Transcript',
      icon: <FileText className="w-5 h-5" />,
      content: <TranscriptParser />,
    },
    {
      id: 'tasks',
      label: 'Task Board',
      icon: <ClipboardList className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
          <TaskTable />
        </div>
      ),
    },
  ];

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50 flex flex-col">
        {/* Background Decorative Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs tabs={tabs} />
          </motion.div>
        </main>
        
        <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200 py-4 relative z-10">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            <p>TaskFlow - Natural Language Task Manager</p>
          </div>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;