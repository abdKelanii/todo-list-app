import { useState, useEffect } from 'react';
import { Input, Button, Box } from '@mantine/core';
import Task from './Task';

const ToDoList = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<{ id: number; taskText: string; isCompleted: boolean }[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const MAX_WORD_LENGTH = 25;

  const AddNewTask = () => {
    if (task !== '') {
      const words = task.trim().split(' ');
      const isWordTooLong = words.some((word) => word.length > MAX_WORD_LENGTH);
      if (!isWordTooLong) {
        const newTask = {
          id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
          taskText: task,
          isCompleted: false,
        };
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTask('');
      } else {
        alert('One or more words are too long! Please enter shorter words.');
      }
    } else {
      alert('Please enter a word.');
    }
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (id: number, newText: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, taskText: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleIsCompleted = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <Box maw={750} mx="auto" className="px-10 py-8 md:mt-20 md:rounded-xl md:bg-[#1d3557] md:shadow-xl">
      <div>
        <div className="mb-5 flex justify-center text-white">
          <h1>ToDo List App</h1>
        </div>
        <div className="w-full items-center justify-between gap-3 gap-x-3 md:flex">
          <Input
            variant="filled"
            style={{ flex: 1 }}
            size={window.innerWidth <= 768 ? 'md' : 'lg'}
            placeholder="Add new task"
            radius="sm"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div>
            <Button
              className="mt-3 w-[100%] md:mt-0 md:w-28"
              fullWidth
              variant="filled"
              size={window.innerWidth <= 768 ? 'sm' : 'lg'}
              radius="sm"
              onClick={AddNewTask}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-5">
          {tasks.map((taskObj) => (
            <Task
              key={taskObj.id}
              taskText={taskObj.taskText}
              isCompleted={taskObj.isCompleted}
              onDelete={() => deleteTask(taskObj.id)}
              onEdit={(newText) => editTask(taskObj.id, newText)}
              onComplete={() => toggleIsCompleted(taskObj.id)}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ToDoList;
