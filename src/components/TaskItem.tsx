import React, { useState } from 'react';
import { Task, Priority } from '../types/Task';
import { useTasks } from '../context/TaskContext';
import { formatDate, isPastDue, isDueSoon } from '../utils/dateUtils';
import { CheckCircle, Clock, Calendar, User, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import TaskEditForm from './TaskEditForm';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case 'P1':
        return 'bg-rose-500';
      case 'P2':
        return 'bg-amber-500';
      case 'P3':
        return 'bg-emerald-500';
      case 'P4':
        return 'bg-blue-500';
      default:
        return 'bg-emerald-500';
    }
  };

  const getDueDateClasses = () => {
    if (!task.dueDate) return 'text-gray-500';
    if (isPastDue(task.dueDate)) return 'text-rose-600 font-medium';
    if (isDueSoon(task.dueDate)) return 'text-amber-600 font-medium';
    return 'text-gray-700';
  };

  if (isEditing) {
    return <TaskEditForm task={task} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 transition-all duration-200 hover:shadow-md ${
      task.completed ? 'opacity-70' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button 
          onClick={() => toggleTaskCompletion(task.id)}
          className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-indigo-600 transition-colors"
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-block w-6 h-6 rounded-full ${getPriorityColor(task.priority)} text-white text-xs font-bold flex items-center justify-center`}>
              {task.priority}
            </span>
            
            <h3 className={`text-lg font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.name}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {task.assignee && (
              <div className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-1 text-gray-400" />
                <span>{task.assignee}</span>
              </div>
            )}
            
            {task.dueDate && (
              <div className={`flex items-center ${getDueDateClasses()}`}>
                {isPastDue(task.dueDate) ? (
                  <Clock className="w-4 h-4 mr-1 text-rose-500" />
                ) : (
                  <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                )}
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-1 flex-shrink-0">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => deleteTask(task.id)}
            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}