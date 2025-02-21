import { useDroppable } from "@dnd-kit/core"
import { FaHourglassHalf } from "react-icons/fa"
import TaskCard from "./TaskCard"

const InprogressTasks = ({ tasks }) => {
  const { setNodeRef } = useDroppable({
    id: "inprogress",
  })

  return (
    <div ref={setNodeRef} className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="sticky p-4 top-0 font-bold flex bg-yellow-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaHourglassHalf />
        </span>
        Inprogress
      </h4>
      <div className="category-container" id="Inprogress-category-container">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default InprogressTasks

