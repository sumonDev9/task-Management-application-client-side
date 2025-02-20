import React from 'react';
import TaskListCard from './TaskListCard';

const TaskList = () => {
    return (
        <section className='bg-gray-50 py-14'>
            <h1 className='text-center text-[#111111] text-xl md:text-2xl'>Task Pipeline</h1>
            <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-8'>
                <div>
                    <div className='bg-indigo-500 p-1 text-center text-white text-lg'>
                        <h2>To-Do</h2>
                    </div>
                    <div className='p-2 grid grid-cols-1 gap-4'>
                    <TaskListCard></TaskListCard>
                    <TaskListCard></TaskListCard>
                    <TaskListCard></TaskListCard>
                    </div>
                </div>
                <div>
                    <div className='bg-indigo-500 p-1 text-center text-white text-lg'>
                        <h2>In Progress</h2>
                    </div>
                    <div className='p-2 grid grid-cols-1 gap-4'>
                    <TaskListCard></TaskListCard>
                    <TaskListCard></TaskListCard>
                    </div>
                </div>
                <div>
                    <div className='bg-indigo-500 p-1 text-center text-white text-lg'>
                        <h2>Done</h2>
                    </div>
                    <div className='p-2 grid grid-cols-1 gap-4'>
                    <TaskListCard></TaskListCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TaskList;