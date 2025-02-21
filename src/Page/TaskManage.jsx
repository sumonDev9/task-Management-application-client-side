import React from 'react';
import AddTask from '../components/AddTask';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

const TaskManage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AddTask></AddTask>
            <TaskList ></TaskList>
            <Footer></Footer>
        </div>
    );
};

export default TaskManage;