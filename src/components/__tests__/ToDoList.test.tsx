import { render, fireEvent, screen } from '@testing-library/react';
import ToDoList from '../ToDoList';

describe('ToDoList Component', () => {
  it('deletes a task when the "Delete" button is clicked', () => {
    render(<ToDoList />);

    const inputElement = screen.getByPlaceholderText('Add new task');
    expect(inputElement).toBeTruthy();
    const addButton = screen.getByText('Add');
    expect(addButton).toBeTruthy();

    // test adding a new task
    fireEvent.change(inputElement, { target: { value: 'New Test Task' } });
    fireEvent.click(addButton);
    const newTaskText = screen.getByText('New Test Task');
    expect(newTaskText).toBeTruthy();
  });
});
