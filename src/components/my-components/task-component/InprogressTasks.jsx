import { FaHourglassHalf } from "react-icons/fa"
import TaskCard from "./TaskCard"

const InprogressTasks = ({ tasks }) => {
  return (
    <div className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="sticky p-4 top-0 font-bold flex bg-yellow-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaHourglassHalf />
        </span>
        In Progress
      </h4>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default InprogressTasks

