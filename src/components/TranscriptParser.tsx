import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types/Task';
import { parseTranscript } from '../utils/openaiParser';

export const TranscriptParser = () => {
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setIsLoading(true);
    try {
      const tasks = await parseTranscript(transcript);
      tasks.forEach(task => addTask(task));
      setTranscript('');
    } catch (error) {
      console.error('Error parsing transcript:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Meeting Transcript Parser</h3>
          <p className="text-sm text-gray-500">Extract tasks from meeting notes automatically</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste meeting transcript here... Example: 'Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday.'"
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm"
            disabled={isLoading}
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading || !transcript.trim()}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors
            ${isLoading || !transcript.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </div>
          ) : (
            'Extract Tasks'
          )}
        </motion.button>
      </form>

      <div className="bg-indigo-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-indigo-800 mb-2">How it works:</h4>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
            Paste your meeting transcript
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
            AI will extract tasks, assignees, and deadlines
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
            Tasks will be added to your task board automatically
          </li>
          <li className="flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
            Default priority is P3 unless specified
          </li>
        </ul>
      </div>
    </div>
  );
}; 