import React, { useState, KeyboardEvent } from 'react';
import { useTasks } from '../context/TaskContext';
import { parseTaskWithOpenAI } from '../utils/openaiParser';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';

export default function TaskInput() {
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTasks();

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() && !isLoading) {
      await handleAddTask();
    }
  };

  const handleAddTask = async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      try {
        const parsedTask = await parseTaskWithOpenAI(input);
        addTask(parsedTask);
        setInput('');
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mb-6"
    >
      <div
        className={`relative bg-white rounded-lg shadow-sm border transition-all duration-200 ${
          isInputFocused ? 'border-indigo-500 shadow-md' : 'border-gray-300'
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Add a task in natural language, e.g. 'Call client Rajeev tomorrow 5pm'"
          className="w-full px-4 py-3 text-gray-700 rounded-lg focus:outline-none"
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddTask}
          disabled={!input.trim() || isLoading}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md text-white font-medium transition-all flex items-center space-x-2 ${
            input.trim() && !isLoading
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="h-5 w-5 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
          <span>{isLoading ? 'Adding...' : 'Add'}</span>
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-sm text-gray-500"
      >
        <p>
          Try adding tasks like: "Finish landing page Aman by 11pm 20th June" or "Call client Rajeev tomorrow 5pm"
        </p>
      </motion.div>
    </motion.div>
  );
}