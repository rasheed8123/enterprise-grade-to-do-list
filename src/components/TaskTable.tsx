import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';

type FilterType = 'all' | 'active' | 'completed';

export default function TaskTable() {
  const { tasks, toggleTaskCompletion } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {(['all', 'active', 'completed'] as FilterType[]).map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              filter === tab
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`hover:bg-gray-50 ${task.completed ? 'bg-gray-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`p-1 rounded-full transition-colors ${
                        task.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <CheckCircle2 className="h-6 w-6" />
                      )}
                    </motion.button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${
                          task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {task.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                        {task.assignee || '-'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <div className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                        {task.dueDate ? format(task.dueDate, 'MMM d, yyyy h:mm a') : '-'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${task.completed ? 'opacity-50' : ''}
                        ${task.priority === 'P1' ? 'bg-red-100 text-red-800' : ''}
                        ${task.priority === 'P2' ? 'bg-orange-100 text-orange-800' : ''}
                        ${task.priority === 'P3' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${task.priority === 'P4' ? 'bg-green-100 text-green-800' : ''}
                      `}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {task.priority}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        <AnimatePresence>
          {filteredTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-4"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
              </h3>
              <p className="text-gray-500 mb-4">
                {filter === 'all' 
                  ? 'Add your first task using the input field above'
                  : filter === 'completed'
                  ? 'Complete some tasks to see them here'
                  : 'Add some tasks to see them here'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 