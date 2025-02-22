import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { MdOutlineDateRange } from "react-icons/md";

const TaskList = () => {
  const { user, fetchTasks, tasks, setTasks } = useContext(AuthContext);
  // console.log(tasks)
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editTask, setEditTask] = useState(null);
  useEffect(() => {
    if (user?.email) {
      fetchTasks();
    }
  }, [user]);


  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceItems = Array.from(tasks[source.droppableId]);
    const destinationItems = Array.from(tasks[destination.droppableId]);
    const [movedItem] = sourceItems.splice(source.index, 1);
    movedItem.category = destination.droppableId;

    destinationItems.splice(destination.index, 0, movedItem);

    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    };

    setTasks(updatedTasks);

    try {
      await axios.patch(`https://task-management-application-server-side.vercel.app/tasks/${movedItem._id}`, {
        category: destination.droppableId,
      });

      toast.success(`Task moved to ${destination.droppableId.replace(/^\w/, (c) => c.toUpperCase())}!`);

      //  task data load
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task!");
    }
  };


  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };



  const onSubmit = async (data) => {
    if (editTask) {
      // Update task (PUT request)
      try {
        const response = await axios.put(`https://task-management-application-server-side.vercel.app/tasks/${editTask._id}`, {
          title: data.title,
          description: data.description,
          category: data.category,
          // timestamp: new Date().toISOString(),
          // userEmail: user?.email,
        });

        console.log("Task Updated:", response.data);
        toast.success("Task updated successfully!");
        fetchTasks();
        setShowModal(false);
        setEditTask(null);
        reset();
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task. Please try again.");
      }

    }
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(`https://task-management-application-server-side.vercel.app/tasks/${_id}`);

        if (data.deletedCount > 0) {
          Swal.fire("Task Deleted!", "Your task has been deleted successfully.", "success");

          // new data load 
          fetchTasks();
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task!");
      }
    }
  };


  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-11/12 mx-auto py-10">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Task Management Board</h1>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
            {Object.keys(tasks).map((column) => (
              <Droppable key={column} droppableId={column}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white text-center rounded-lg shadow-lg"
                  >
                    <h2 className="text-lg font-semibold bg-indigo-500 p-2 text-white mb-3 rounded">
                      {column === "todo"
                        ? "To-Do"
                        : column === "inprogress"
                          ? "In Progress"
                          : "Done"}
                    </h2>
                    <div className="space-y-4 px-2 pb-2">
                      {tasks[column].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card bg-gray-50 text-start shadow-sm border border-gray-200 rounded-md p-3"
                            >
                              <h2 className="font-semibold text-gray-800">{task.title}</h2>
                              <p className="text-sm text-gray-600">{task.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-1">
                                  <p><MdOutlineDateRange size={14} /></p>
                                  <h3 className="text-gray-600 text-sm">{new Date(task.timestamp).toLocaleDateString()}</h3>
                                </div>
                                <div className="space-x-2">
                                  <button onClick={() => handleEdit(task)} className="btn btn-sm border border-blue-500 text-blue-500 rounded-md px-2">
                                    <FaEdit className="text-lg" />
                                  </button>
                                  <button onClick={() => handleDelete(task._id)} className="btn btn-sm border border-red-500 text-red-500 rounded-md px-2">
                                    <RiDeleteBin5Line className="text-lg" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {
        showModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                {/* Task Title */}
                <div>
                  <label className="block text-gray-700 font-medium">Task Title <span className="text-red-500">*</span></label>
                  <input
                    defaultValue={editTask?.title}
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
                    defaultValue={editTask?.description}
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
                  <label className="block text-gray-700 font-medium">Category  <span className="text-red-500">*</span></label>
                  <select
                    defaultValue={editTask?.category}
                    {...register("category", { required: true })}
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  >
                    <option value="" disabled>Category select</option>
                    <option value="todo">To-Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="modal-action gap-2">
                  <button className="btn bg-indigo-600 text-white">Save</button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn text-white bg-rose-500">Close</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default TaskList;
