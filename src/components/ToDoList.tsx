import { useState, useEffect } from 'react';
import { Input, Button, Box } from '@mantine/core';
import Task from './Task';

const ToDoList = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const AddNewTask = () => {
    if (task !== '') {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      setTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (index: number, newText: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newText;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <Box maw={750} mx="auto" className="md:mt-20 md:rounded-xl md:bg-[#1d3557] px-10 py-8 md:shadow-xl">
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
          {tasks.map((taskText, index) => (
            <Task
              key={index}
              taskText={taskText}
              onDelete={() => deleteTask(index)}
              onEdit={(newText) => editTask(index, newText)}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ToDoList;
