
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
const TaskList = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "1", title: "Task 1", description: "Description 1" },
      { id: "2", title: "Task 2", description: "Description 2" }
    ],
    inprogress: [
      { id: "3", title: "Task 3", description: "Description 3" }
    ],
    done: []
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: items
      }));
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destinationItems = Array.from(tasks[destination.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems
      }));
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-100">
      <div className=" w-11/12 mx-auto  py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task Management Board</h1>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(tasks).map((column) => (
              <Droppable key={column} droppableId={column}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white text-center  rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold  bg-indigo-500 p-1 text-white mb-3">
                      {column === "todo" ? "To-Do" : column === "inprogress" ? "In Progress" : "Done"}
                    </h2>
                    <div className="space-y-4 px-2 py-2">
                      {tasks[column].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card bg-base-100 card-xs shadow-sm"
                            >

                              <div className="card-body">
                                <h2 className="card-title">Xsmall Card</h2>
                                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                                <div className="justify-end card-actions">
                                  <button className="btn btn-outline p-0 px-2 py-1  text-blue-500  rounded-md"><FaEdit className='text-xl' /></button>
                                  <button className="btn btn-outline p-0 px-2 py-1  text-red-500 rounded-md"><RiDeleteBin5Line className='text-xl' /></button>
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
    </section>
  );
};

export default TaskList;
