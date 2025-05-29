# TaskFlow - AI-Powered Task Manager

TaskFlow is a modern, AI-powered task management application that uses natural language processing to help you organize your tasks efficiently. Built with React, TypeScript, and OpenAI integration, it provides a beautiful and intuitive interface for managing your daily tasks.

![TaskFlow Screenshot](screenshot.png)

<img width="956" alt="image" src="https://github.com/user-attachments/assets/2a85f1d9-92d6-4820-9132-36583390f9b4" />
<img width="955" alt="image" src="https://github.com/user-attachments/assets/ab98a695-a38d-4531-aba8-e4877b07c7a5" />



## 🌟 Features

- **Natural Language Task Input**: Add tasks using everyday language
- **Meeting Transcript Parser**: Extract multiple tasks from meeting notes automatically
- **AI-Powered Parsing**: Automatically extracts task details using OpenAI
- **Smart Task Organization**: 
  - Task name
  - Assignee
  - Due date & time
  - Priority levels (P1-P4)
- **Task Completion**: Mark tasks as complete/incomplete
- **Filtering System**: View all, active, or completed tasks
- **Beautiful UI**: Modern design with smooth animations
- **Responsive Design**: Works on all devices
- **Local Storage**: Tasks persist between sessions

## 👥 User Guide

### Adding Tasks

#### Single Task Input
1. Go to the "Add Single Task" tab
2. Type your task in natural language in the input field
3. Examples:
   - "Finish landing page by Aman due 11pm 20th June P2"
   - "Call client Rajeev tomorrow 5pm"
   - "Review pull requests by John next Monday P1"
4. Click "Add" or press Enter
5. The AI will parse your input and create a structured task

#### Meeting Transcript Parser
1. Go to the "Meeting Transcript" tab
2. Paste your entire meeting transcript
3. Example transcript:
   ```
   "Aman you take the landing page by 10pm tomorrow. 
   Rajeev you take care of client follow-up by Wednesday. 
   Shreya please review the marketing deck tonight."
   ```
4. Click "Extract Tasks"
5. The AI will automatically:
   - Extract all tasks
   - Identify assignees
   - Parse deadlines
   - Set default priority (P3)
   - Add all tasks to your task board

### Managing Tasks

- **View Tasks**: Go to the "Task Board" tab to see all your tasks
- **Mark as Complete**: Click the checkbox icon next to a task
- **Filter Tasks**: Use the tabs at the top to view:
  - All tasks
  - Active tasks
  - Completed tasks
- **View Task Details**: Each task shows:
  - Task name
  - Assignee
  - Due date & time
  - Priority level

### Priority Levels

- **P1**: Highest priority (Red)
- **P2**: High priority (Orange)
- **P3**: Medium priority (Yellow) - Default
- **P4**: Low priority (Green)

## 👨‍💻 Developer Guide

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rasheed8123/enterprise-grade-to-do-list.git
   cd enterprise-grade-to-do-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Application header
│   ├── TaskInput.tsx    # Single task input component
│   ├── TaskTable.tsx    # Task list component
│   ├── TranscriptParser.tsx # Meeting transcript parser
│   └── Tabs.tsx         # Tab navigation component
├── context/             # React context
│   └── TaskContext.tsx  # Task management context
├── types/               # TypeScript types
│   └── Task.ts          # Task interface
├── utils/               # Utility functions
│   └── openaiParser.ts  # OpenAI integration
└── App.tsx              # Main application component
```

### Key Technologies

- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **OpenAI API**: Natural language processing
- **date-fns**: Date formatting
- **Lucide Icons**: Icon library

### Development Workflow

1. **Adding Features**:
   - Create new components in `src/components/`
   - Add types in `src/types/`
   - Implement utilities in `src/utils/`

2. **Styling**:
   - Use Tailwind CSS classes
   - Add custom animations in `src/index.css`
   - Follow the existing design system

3. **Testing**:
   ```bash
   npm run test
   ```

4. **Building for Production**:
   ```bash
   npm run build
   ```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- The React and Tailwind CSS communities
- All contributors to the project 
