import { Priority, Task } from '../types/Task';

/**
 * Parses a natural language task string into structured task data
 */
export function parseTaskInput(input: string): Omit<Task, 'id' | 'completed' | 'createdAt'> {
  // Default values
  const defaultTask: Omit<Task, 'id' | 'completed' | 'createdAt'> = {
    name: input.trim(),
    assignee: null,
    dueDate: null,
    priority: 'P3',
  };

  // If empty input, return default
  if (!input.trim()) {
    return defaultTask;
  }

  try {
    // Extract priority if specified (P1, P2, P3, P4)
    const priorityMatch = input.match(/\b(P[1-4])\b/i);
    if (priorityMatch) {
      defaultTask.priority = priorityMatch[1].toUpperCase() as Priority;
      input = input.replace(priorityMatch[0], '').trim();
    }

    // Extract assignee - look for pattern "name person" where person is after a preposition
    const assigneeRegex = /\b(?:to|for|by)\s+([A-Z][a-z]+)\b/i;
    const assigneeMatch = input.match(assigneeRegex);
    
    if (!assigneeMatch) {
      // Alternative - try to find a capitalized name
      const nameRegex = /\b([A-Z][a-z]+)\b/;
      const nameMatch = input.match(nameRegex);
      if (nameMatch) {
        defaultTask.assignee = nameMatch[1];
        input = input.replace(nameMatch[0], '').trim();
      }
    } else {
      defaultTask.assignee = assigneeMatch[1];
      input = input.replace(assigneeMatch[0], '').trim();
    }

    // Extract due date and time
    const dateTimePatterns = [
      // Tomorrow at specific time
      { regex: /\btomorrow\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i, handler: matchesToDate },
      // Today at specific time
      { regex: /\btoday\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i, handler: matchesToDate },
      // Specific date with month name and optional year
      { regex: /\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(?:\w*)\.?\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?(?:\s+(\d{4}))?\b/i, handler: matchesToDate },
      // Month name with day and optional year
      { regex: /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(?:\w*)\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s+(\d{4}))?(?:\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?)?\b/i, handler: matchesToDate },
      // XX/XX/XXXX or XX-XX-XXXX date formats
      { regex: /\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?(?:\s+(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?)?\b/i, handler: matchesToDate },
    ];

    // Try each pattern
    for (const pattern of dateTimePatterns) {
      const match = input.match(pattern.regex);
      if (match) {
        defaultTask.dueDate = pattern.handler(match);
        input = input.replace(match[0], '').trim();
        break;
      }
    }

    // After extracting metadata, the remaining text is the task name
    if (input.trim()) {
      defaultTask.name = input.trim();
    }

    return defaultTask;
  } catch (error) {
    console.error('Error parsing task:', error);
    return defaultTask;
  }
}

/**
 * Helper function to convert regex matches to Date object
 */
function matchesToDate(matches: RegExpMatchArray): Date {
  const now = new Date();
  const result = new Date(now);

  // Handle "tomorrow"
  if (matches[0].toLowerCase().includes('tomorrow')) {
    result.setDate(now.getDate() + 1);
    
    // Set time if specified
    if (matches[1]) {
      const timeMatch = matches[1].match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1]);
        const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        const period = timeMatch[3].toLowerCase();
        
        // Convert to 24-hour format
        if (period === 'pm' && hours < 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;
        
        result.setHours(hours, minutes, 0, 0);
      }
    }
    return result;
  }
  
  // Handle "today"
  if (matches[0].toLowerCase().includes('today')) {
    // Set time if specified
    if (matches[1]) {
      const timeMatch = matches[1].match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1]);
        const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        const period = timeMatch[3].toLowerCase();
        
        // Convert to 24-hour format
        if (period === 'pm' && hours < 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;
        
        result.setHours(hours, minutes, 0, 0);
      }
    }
    return result;
  }

  // Handle month names
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  for (let i = 0; i < monthNames.length; i++) {
    if (matches[0].toLowerCase().includes(monthNames[i])) {
      let day, month, year, time;
      
      // Check different possible positions of month, day, year and time
      if (matches[0].match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(${monthNames[i]})`, 'i'))) {
        // Format: DD MMM YYYY
        day = parseInt(matches[1]);
        month = i;
        year = matches[4] ? parseInt(matches[4]) : now.getFullYear();
        time = matches[3];
      } else {
        // Format: MMM DD YYYY
        month = i;
        day = parseInt(matches[2]);
        year = matches[3] ? parseInt(matches[3]) : now.getFullYear();
        time = matches[4];
      }
      
      // Fix two-digit year
      if (year && year < 100) year += 2000;
      
      result.setFullYear(year || now.getFullYear());
      result.setMonth(month);
      result.setDate(day);
      
      // Set time if available
      if (time) {
        const timeMatch = time.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
        if (timeMatch) {
          let hours = parseInt(timeMatch[1]);
          const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
          const period = timeMatch[3]?.toLowerCase();
          
          // Convert to 24-hour format
          if (period === 'pm' && hours < 12) hours += 12;
          if (period === 'am' && hours === 12) hours = 0;
          
          result.setHours(hours, minutes, 0, 0);
        }
      } else {
        // Default to end of day if no time specified
        result.setHours(23, 59, 0, 0);
      }
      
      return result;
    }
  }
  
  // Handle numeric date formats (MM/DD/YYYY or MM-DD-YYYY)
  if (matches[1] && matches[2]) {
    const first = parseInt(matches[1]);
    const second = parseInt(matches[2]);
    const third = matches[3] ? parseInt(matches[3]) : now.getFullYear();
    
    // Assume MM/DD/YYYY format
    const month = first - 1; // Months are 0-indexed in JS
    const day = second;
    let year = third;
    
    // Fix two-digit year
    if (year && year < 100) year += 2000;
    
    result.setFullYear(year || now.getFullYear());
    result.setMonth(month);
    result.setDate(day);
    
    // Set time if available
    if (matches[4]) {
      const timeMatch = matches[4].match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1]);
        const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        const period = timeMatch[3]?.toLowerCase();
        
        // Convert to 24-hour format
        if (period === 'pm' && hours < 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;
        
        result.setHours(hours, minutes, 0, 0);
      }
    } else {
      // Default to end of day if no time specified
      result.setHours(23, 59, 0, 0);
    }
    
    return result;
  }
  
  // If we couldn't parse a date but had a time, set it for today
  const timeOnlyMatch = matches[0].match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (timeOnlyMatch) {
    let hours = parseInt(timeOnlyMatch[1]);
    const minutes = timeOnlyMatch[2] ? parseInt(timeOnlyMatch[2]) : 0;
    const period = timeOnlyMatch[3].toLowerCase();
    
    // Convert to 24-hour format
    if (period === 'pm' && hours < 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
    
    result.setHours(hours, minutes, 0, 0);
    return result;
  }

  // Default fallback
  return result;
}