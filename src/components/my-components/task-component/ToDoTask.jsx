import { MdOutlinePendingActions } from "react-icons/md";
import TaskCard from "./TaskCard";

const ToDoTask = ({ tasks }) => {
  return (
    <div className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className="font-bold sticky p-4 top-0 flex bg-blue-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <MdOutlinePendingActions />
        </span>
        To Do
      </h4>
      <div className="mt-2">
        {tasks.map((task) => (
          <TaskCard  key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ToDoTask;
