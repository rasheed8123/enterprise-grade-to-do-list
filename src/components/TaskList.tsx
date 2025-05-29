import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ListFilter, ArrowDownUp } from 'lucide-react';

type SortOption = 'dueDate' | 'priority' | 'assignee' | 'createdAt';
type FilterOption = 'all' | 'completed' | 'active';

export default function TaskList() {
  const { tasks } = useTasks();
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getSortedTasks = () => {
    // First, filter tasks
    const filteredTasks = tasks.filter((task) => {
      if (filterBy === 'all') return true;
      if (filterBy === 'completed') return task.completed;
      if (filterBy === 'active') return !task.completed;
      return true;
    });

    // Then sort them
    return filteredTasks.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
        case 'priority':
          const priorityOrder = { P1: 0, P2: 1, P3: 2, P4: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'assignee':
          if (!a.assignee && !b.assignee) comparison = 0;
          else if (!a.assignee) comparison = 1;
          else if (!b.assignee) comparison = -1;
          else comparison = a.assignee.localeCompare(b.assignee);
          break;
        case 'createdAt':
        default:
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const sortedTasks = getSortedTasks();

  return (
    <div>
      {tasks.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <div className="flex items-center space-x-1">
              <ListFilter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 mr-2">Filter:</span>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setFilterBy('all')}
                  className={`px-3 py-1 text-sm ${
                    filterBy === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterBy('active')}
                  className={`px-3 py-1 text-sm ${
                    filterBy === 'active'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterBy('completed')}
                  className={`px-3 py-1 text-sm ${
                    filterBy === 'completed'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <ArrowDownUp className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
                >
                  <option value="createdAt">Date Added</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="assignee">Assignee</option>
                </select>
              </div>

              <button
                onClick={toggleSortDirection}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white hover:bg-gray-100"
              >
                {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              </button>
            </div>
          </div>

          <div>
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No tasks match your filter criteria
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-4">
            Add your first task using the input field above
          </p>
        </div>
      )}
    </div>
  );
}