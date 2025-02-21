import { FaHourglassHalf } from "react-icons/fa"
import TaskCard from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

const InprogressTasks = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: "In Progress",
  })

  return (
    <div ref={setNodeRef} className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="sticky p-4 top-0 font-bold flex bg-yellow-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaHourglassHalf />
        </span>
        In Progress
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

export default InprogressTasks

