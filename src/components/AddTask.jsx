import { useForm } from 'react-hook-form';

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Task Submitted:", data);
        reset();
    };

    return (
   <div className=''>
         <div className='w-11/12 bg-white mx-auto grid grid-cols-1 md:grid-cols-2 gap-5  my-10'>
            <div className="p-6 shadow  rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>

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
                        <label className="block text-gray-700 font-medium">Description (Optional)</label>
                        <textarea
                            {...register("description", {
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
                            <option value="">Category selete</option>
                            <option value="todo">To-Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
            {/*  */}
            <div >
                <img className='h-[450px] mx-auto' src="https://i.ibb.co/YBqMrxnp/image.png" alt="" />
            </div>
        </div>
   </div>
    );
};

export default AddTask;