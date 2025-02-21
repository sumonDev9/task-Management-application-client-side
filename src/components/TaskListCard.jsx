import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const TaskListCard = ({content}) => {
    console.log(content)
    return (
        <div className="card bg-base-100 card-xs shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Xsmall Card</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="p-2 bg-green-500 text-white rounded-md"><FaEdit className='text-xl'/></button>
            <button className="p-2 bg-red-700 text-white rounded-md"><RiDeleteBin5Line className='text-xl'/></button>
          </div>
        </div>
      </div>
      
    );
};

export default TaskListCard;

