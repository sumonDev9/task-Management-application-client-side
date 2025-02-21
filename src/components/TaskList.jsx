import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const TaskList = () => {
   const {user} = useContext(AuthContext);
  const [tasks, setTasks] = useState({ todo: [], inprogress: [], done: [] });

// api data load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${user?.email}`);
        const taskData = response.data;
        console.log(taskData)
        // task category set 
        const categorizedTasks = { todo: [], inprogress: [], done: [] };
        taskData.forEach((task) => {
          categorizedTasks[task.category]?.push(task);
        });

        setTasks(categorizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks!");
      }
    };

    fetchTasks();
  }, [user]);

  
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // task updated
    const sourceItems = Array.from(tasks[source.droppableId]);
    const destinationItems = Array.from(tasks[destination.droppableId]);
    const [movedItem] = sourceItems.splice(source.index, 1);
    movedItem.category = destination.droppableId; // new category set

    destinationItems.splice(destination.index, 0, movedItem);

    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    };

    setTasks(updatedTasks);

   // updated server side
   try {
    await axios.patch(`http://localhost:5000/tasks/${movedItem._id}`, {
      category: destination.droppableId,
    });

    toast.success(`Task moved to ${destination.droppableId.replace(/^\w/, (c) => c.toUpperCase())}!`);
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task!");
  }
  };

  // const handleDelete = async (_id) => {
       
  //   const result =  await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  // })
  // if (result.isConfirmed) {
  //   const { data } = await axios.delete(`http://localhost:5000/tasks/${_id}`);
  //   console.log(data)
  //   if (data.deletedCount > 0) {
  //     Swal.fire({
  //       title: 'Service Deleted!',
  //       text: 'Your service has been deleted successfully.',
  //       icon: 'success',
  //       confirmButtonText: 'Okay',
  //     });

  //     const remainingTask = tasks.filter(task => task._id !== _id);
  //     setTasks(remainingTask);

 
  //   }
  // }
  // }

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
        const { data } = await axios.delete(`http://localhost:5000/tasks/${_id}`);
        console.log(data);
  
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Task Deleted!",
            text: "Your task has been deleted successfully.",
            icon: "success",
            confirmButtonText: "Okay",
          });
  
          // category fiter delete
          setTasks((prevTasks) => ({
            todo: prevTasks.todo.filter((task) => task._id !== _id),
            inprogress: prevTasks.inprogress.filter((task) => task._id !== _id),
            done: prevTasks.done.filter((task) => task._id !== _id),
          }));
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task Management Board</h1>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                              <div className="flex justify-end space-x-2 mt-2">
                                <button className="btn btn-sm border border-blue-500 text-blue-500 rounded-md px-2">
                                  <FaEdit className="text-lg" />
                                </button>
                                <button onClick={() => handleDelete(task._id)} className="btn btn-sm border border-red-500 text-red-500 rounded-md px-2">
                                  <RiDeleteBin5Line className="text-lg" />
                                </button>
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
    </section>
  );
};

export default TaskList;
