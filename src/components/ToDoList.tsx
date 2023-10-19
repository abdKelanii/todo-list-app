import { useState, useEffect } from 'react';
import { Input, Button, Group, Box, Flex, Title } from '@mantine/core';
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
    <Box maw={750} mx="auto">
      <div className="mb-5">
        <Title order={1}>ToDo List App</Title>
      </div>
      <Flex
        mih={50}
        gap={window.innerWidth <= 768 ? 'sm' : 'md'}
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Input
          variant="filled"
          style={{ flex: 1 }}
          size={window.innerWidth <= 768 ? 'md' : 'lg'}
          placeholder="Add new task"
          radius="sm"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Group>
          <Button
            variant="filled"
            size={window.innerWidth <= 768 ? 'md' : 'lg'}
            radius="sm"
            onClick={AddNewTask}
            style={{ width: 120 }}
          >
            Add
          </Button>
        </Group>
      </Flex>
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
    </Box>
  );
};

export default ToDoList;
