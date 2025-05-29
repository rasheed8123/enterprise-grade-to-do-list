/**
 * Format a date to display in the UI
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | null): string {
  if (!date) return 'No due date';
  
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Check if date is today
  if (isSameDay(date, now)) {
    return `Today at ${formatTime(date)}`;
  }
  
  // Check if date is tomorrow
  if (isSameDay(date, tomorrow)) {
    return `Tomorrow at ${formatTime(date)}`;
  }
  
  // Format date as "11:00 PM, 20 June" if it's this year, otherwise include year
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
  };
  
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = 'numeric';
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Format a time to display in the UI
 * @param date The date containing the time to format
 * @returns Formatted time string
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

/**
 * Check if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if the dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is in the past
 * @param date The date to check
 * @returns True if the date is in the past
 */
export function isPastDue(date: Date | null): boolean {
  if (!date) return false;
  return date < new Date();
}

/**
 * Check if a date is within 24 hours
 * @param date The date to check
 * @returns True if the date is within 24 hours
 */
export function isDueSoon(date: Date | null): boolean {
  if (!date) return false;
  const now = new Date();
  const hours24 = new Date(now);
  hours24.setHours(now.getHours() + 24);
  return date > now && date <= hours24;
}