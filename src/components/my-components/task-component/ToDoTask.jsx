import { MdOutlinePendingActions } from "react-icons/md"
import TaskCard from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

const ToDoTask = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: "To-Do",
  })

  return (
    <div ref={setNodeRef} className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="font-bold sticky p-4 top-0 flex bg-blue-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <MdOutlinePendingActions />
        </span>
        To Do
      </h4>
      <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
        <div>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export default ToDoTask

