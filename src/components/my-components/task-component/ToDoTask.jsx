import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdTime } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import TaskCard from "./TaskCard";
const ToDoTask = () => {
  return (
    <div className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className=" font-bold  sticky p-4 top-0 flex bg-blue-400  py-5 text-xl">
        <span className="mt-1 mr-1">
          <MdOutlinePendingActions />
        </span>
        To Do
      </h4>
      <div>
      <TaskCard></TaskCard>
      </div>
    </div>
  );
};

export default ToDoTask;
<h1>todo</h1>;
