import React, { useState } from 'react';
import { Button, Modal, Input } from '@mantine/core';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useDisclosure } from '@mantine/hooks';

interface TaskProps {
  taskText: string;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const Task: React.FC<TaskProps> = ({ taskText, onDelete, onEdit }) => {
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const [editText, setEditText] = useState(taskText);

  const handleEdit = () => {
    onEdit(editText);
    closeEdit();
  };

  return (
    <div className="mb-3 rounded-md bg-slate-200 p-4">
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        size={window.innerWidth <= 768 ? 'xs' : 'md'}
        title="Edit Task"
        className="flex h-screen items-center justify-center"
      >
        <div className="flex items-center justify-center">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size={window.innerWidth <= 768 ? 'sm' : 'md'}
            placeholder="Edit task"
          />
          <Button color="blue" size={window.innerWidth <= 768 ? 'sm' : 'md'} onClick={handleEdit}>
            Save
          </Button>
        </div>
      </Modal>

      {/* confirm delete task modal */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        size={window.innerWidth <= 768 ? 'xs' : 'md'}
        title="Are you sure you want to delete this task?"
        className="flex h-screen items-center justify-center"
      >
        <div className="flex items-center justify-center">
          {/* Content for the second modal */}
          <Button color="red" size={window.innerWidth <= 768 ? 'sm' : 'md'} onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Modal>

      <div className="flex justify-between">
        <div className="align-text-left flex items-center">
          <p className="max-w-xl">{taskText}</p>
        </div>
        <div className="flex flex-col gap-y-1 md:flex-row md:gap-2 md:gap-y-0">
          {/* Edit Button */}
          <div>
            <Button color="green" size={window.innerWidth <= 768 ? 'sm' : 'md'} onClick={openEdit}>
              <BiSolidEdit />
            </Button>
          </div>
          {/* Delete Button */}
          <div>
            <Button color="red" size={window.innerWidth <= 768 ? 'sm' : 'md'} onClick={openDelete}>
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
