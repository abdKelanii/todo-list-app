import React, { useState } from 'react';
import { Button, Modal, Input } from '@mantine/core';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useDisclosure } from '@mantine/hooks';

interface TaskProps {
  taskText: string;
  isCompleted: boolean;
  onDelete: () => void;
  onEdit: (newText: string) => void;
  onComplete: () => void;
}

const Task: React.FC<TaskProps> = ({ taskText, isCompleted, onDelete, onEdit, onComplete }) => {
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const [editText, setEditText] = useState(taskText);

  const handleEdit = () => {
    onEdit(editText);
    closeEdit();
  };

  const handleDelete = () => {
    onDelete();
    closeDelete();
  };

  return (
    <div className={`mb-3 rounded-md bg-white p-4`}>
      {/* Edit task modal */}
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        size={window.innerWidth <= 768 ? 'xs' : 'lg'}
        title="Edit Task"
        className="flex items-center justify-center"
      >
        <div className="w-full items-center justify-between gap-3 gap-x-3 md:flex">
          <div className="md:flex-1">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              size={window.innerWidth <= 768 ? 'sm' : 'md'}
              placeholder="Edit task"
            />
          </div>
          <div className="">
            <Button
              color="blue"
              size={window.innerWidth <= 768 ? 'sm' : 'md'}
              onClick={handleEdit}
              className="mt-3 w-full md:mt-0"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm delete task modal */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        size={window.innerWidth <= 768 ? 'xs' : 'md'}
        title="Are you sure you want to delete this task?"
        className="flex items-center justify-center"
      >
        <div className={`flex items-center justify-center`}>
          {/* Content for the second modal */}
          <Button color="red" size={window.innerWidth <= 768 ? 'sm' : 'md'} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>

      <div className="flex justify-between">
        <div
          className={`align-text-left flex cursor-pointer items-center ${
            isCompleted ? 'italic text-green-900 line-through' : ''
          }`}
          onClick={onComplete}
        >
          <p className={`max-w-xl`}>{taskText}</p>
        </div>
        <div className="flex flex-col gap-y-1 md:flex-row md:gap-2 md:gap-y-0">
          {/* Edit Button */}
          <div>
            <Button color="green" size={window.innerWidth <= 768 ? 'xs' : 'md'} onClick={openEdit}>
              <BiSolidEdit />
            </Button>
          </div>
          {/* Delete Button */}
          <div>
            <Button color="red" size={window.innerWidth <= 768 ? 'xs' : 'md'} onClick={openDelete}>
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
