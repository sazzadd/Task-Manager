import { useDroppable } from "@dnd-kit/core";
import { FaCheckDouble } from "react-icons/fa";
import TaskCard from "./TaskCard";

const FinishedTask = ({ tasks }) => {
  const { setNodeRef } = useDroppable({
    id: "finished",
  });

  return (
    <div
      ref={setNodeRef}
      className="lg:flex-1 bg-secondary/40 rounded-md border border-green-400 h-full overflow-y-auto"
    >
      <h4 className="sticky flex p-4 top-0 font-bold bg-green-400 py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaCheckDouble />
        </span>
        Finished
      </h4>
      <div className="category-container" id="finished-category-container">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default FinishedTask;
