import { useDroppable } from "@dnd-kit/core"
import { MdOutlinePendingActions } from "react-icons/md"
import TaskCard from "./TaskCard"

const ToDoTask = ({ tasks }) => {
  const { setNodeRef } = useDroppable({
    id: "to-do",
  })

  return (
    <div ref={setNodeRef} className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="font-bold sticky p-4 top-0 flex bg-blue-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <MdOutlinePendingActions />
        </span>
        To Do
      </h4>
      <div className="category-container" id="todo-category-container">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default ToDoTask

