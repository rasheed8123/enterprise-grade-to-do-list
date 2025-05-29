import React, { useState } from 'react';
import { Task, Priority } from '../types/Task';
import { useTasks } from '../context/TaskContext';
import { Calendar, User, Flag } from 'lucide-react';

interface TaskEditFormProps {
  task: Task;
  onClose: () => void;
}

export default function TaskEditForm({ task, onClose }: TaskEditFormProps) {
  const { updateTask } = useTasks();
  const [name, setName] = useState(task.name);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate.getTime() - task.dueDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''
  );
  const [priority, setPriority] = useState<Priority>(task.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateTask({
      ...task,
      name,
      assignee: assignee || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
    });
    
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="task-name" className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            id="task-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Assignee
              </span>
            </label>
            <input
              id="assignee"
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Who is responsible?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Due Date & Time
              </span>
            </label>
            <input
              id="due-date"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                <Flag className="w-4 h-4 mr-1" />
                Priority
              </span>
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="P1">P1 (Highest)</option>
              <option value="P2">P2 (High)</option>
              <option value="P3">P3 (Medium)</option>
              <option value="P4">P4 (Low)</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}