import { render, fireEvent } from '@testing-library/react';
import Task from '../components/Task';

describe('Task Component', () => {
  const sampleTask = {
    taskText: 'Sample Task',
    isCompleted: false,
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onComplete: jest.fn(),
  };

  it('renders the task with the correct text', () => {
    const { getByText } = render(<Task {...sampleTask} />);
    expect(getByText('Sample Task')).toBeInTheDocument();
  });

  it('calls onComplete when the task is clicked', () => {
    const { getByText } = render(<Task {...sampleTask} />);
    fireEvent.click(getByText('Sample Task'));
    expect(sampleTask.onComplete).toHaveBeenCalled();
  });

  it('opens edit modal when the edit button is clicked', () => {
    const { getByTestId } = render(<Task {...sampleTask} />);
    const editButton = getByTestId('edit-button');
    fireEvent.click(editButton);
    expect(sampleTask.onEdit).not.toHaveBeenCalled(); 
  });

  it('calls onEdit when the save button in the edit modal is clicked', () => {
    const { getByTestId, getByText, getByRole } = render(<Task {...sampleTask} />);
    const editButton = getByTestId('edit-button');
    fireEvent.click(editButton);

    const input = getByRole('textbox', { name: 'Edit task' });
    fireEvent.change(input, { target: { value: 'New Task Text' } });

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    expect(sampleTask.onEdit).toHaveBeenCalledWith('New Task Text');
  });

  it('opens delete modal when the delete button is clicked', () => {
    const { getByTestId } = render(<Task {...sampleTask} />);
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(sampleTask.onDelete).not.toHaveBeenCalled(); 
  });

  it('calls onDelete when the delete button in the delete modal is clicked', () => {
    const { getByTestId, getByText } = render(<Task {...sampleTask} />);
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    const confirmDeleteButton = getByText('Delete');
    fireEvent.click(confirmDeleteButton);

    expect(sampleTask.onDelete).toHaveBeenCalled();
  });
});
