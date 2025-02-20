import { FaCheckDouble } from "react-icons/fa";
import TaskCard from "./TaskCard";

const FinishedTask = () => {
  return (
    <div className="lg:flex-1 bg-secondary/40 rounded-md  h-full overflow-y-auto">
      <h4 className="sticky flex p-4 top-0 font-bold bg-green-400  py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaCheckDouble />
        </span>{" "}
        Finished
      </h4>
      <div className="">
        <TaskCard></TaskCard>
      </div>
    </div>
  );
};

export default FinishedTask;
