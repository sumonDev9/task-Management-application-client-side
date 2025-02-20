import React from 'react';
import AddTask from '../components/AddTask';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';

const TaskManage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AddTask></AddTask>
            <TaskList></TaskList>
        </div>
    );
};

export default TaskManage;