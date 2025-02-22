import { useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
const AddTask = () => {
    const {user, fetchTasks} = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://task-management-application-server-side.vercel.app/tasks", {
                title: data.title,
                description: data.description,
                category: data.category,
                timestamp: new Date().toISOString(),
                userEmail: user?.email,
                name: user?.displayName,
                userId: user?.uid
            });

            // console.log("Task Added:", response.data);

            // Show success toast
            toast.success("Task added successfully!");

            // Reset form after successful submission
            reset();
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);

            // Show error toast
            toast.error("Failed to add task. Please try again.");
        }
    };

    return (
   <div className=''>
         <div className='w-11/12 bg-white mx-auto grid grid-cols-1 md:grid-cols-2 gap-5  my-10'>
            <div className="p-6 shadow  rounded-lg">
                <h2 className="text-xl text-center md:text-2xl font-semibold text-gray-800 mb-4">{user?.displayName} Add New Task</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Task Title */}
                    <div>
                        <label className="block text-gray-700 font-medium">Task Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            {...register("title", {
                                required: "Title is required",
                                maxLength: { value: 50, message: "Title cannot exceed 50 characters" }
                            })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                            placeholder="Enter task title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium">Description <span className="text-red-500">*</span></label>
                        <textarea
                            {...register("description", {
                                required: "Description is required",
                                maxLength: { value: 200, message: "Description cannot exceed 200 characters" }
                            })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none h-24 resize-none"
                            placeholder="Enter task details"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 font-medium">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                        >
                            <option value="" disabled>Category select</option>
                            <option value="todo">To-Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
            {/*  */}
            <div className='hidden md:flex'>
                <img className='h-[450px] mx-auto object-cover' src="https://i.ibb.co/YBqMrxnp/image.png" alt="" />
            </div>
        </div>
   </div>
    );
};

export default AddTask;