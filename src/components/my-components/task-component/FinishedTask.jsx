import { FaCheckDouble } from "react-icons/fa"
import TaskCard from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

const FinishedTask = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: "Done",
  })

  return (
    <div ref={setNodeRef} className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="sticky flex p-4 top-0 font-bold bg-green-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaCheckDouble />
        </span>
        Finished
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

export default FinishedTask

