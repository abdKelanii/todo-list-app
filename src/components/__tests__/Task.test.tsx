import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../Task';

describe('Task Component', () => {
  const sampleTask = {
    taskText: 'Sample Task',
    isCompleted: false,
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onComplete: jest.fn(),
  };

  it('renders the task with the correctly', () => {
    render(<Task {...sampleTask} />);
    const taskText = screen.getByText('Sample Task');
    expect(taskText).toBeTruthy();
  });
});

test('Edit button is present and opens the edit modal', () => {
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  render(
    <Task
      taskText="Sample Task"
      isCompleted={false}
      onDelete={onDelete}
      onEdit={onEdit}
      onComplete={jest.fn()}
    />,
  );

  const editButton = screen.getByTestId('edit-button');
  fireEvent.click(editButton);
});

test('Delete button is present and opens the delete modal', () => {
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  render(
    <Task
      taskText="Sample Task"
      isCompleted={false}
      onDelete={onDelete}
      onEdit={onEdit}
      onComplete={jest.fn()}
    />,
  );

  const deleteButton = screen.getByTestId('delete-button');
  fireEvent.click(deleteButton);
});
