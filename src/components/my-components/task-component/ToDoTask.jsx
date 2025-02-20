import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdTime } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
const ToDoTask = () => {
  return (
    <div className="lg:flex-1 bg-secondary/40 rounded-md h-full overflow-y-auto">
      <h4 className=" font-bold  sticky p-4 top-0 flex bg-blue-400  py-5 text-xl">
        <span className="mt-1 mr-1">
          <MdOutlinePendingActions />
        </span>
        To Do
      </h4>
      <div className="p-2">
        <Card className="border border-gray-300 shadow-sm p-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium flex items-center gap-2">
            will finish React Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Work on the new React assignment and submit before the deadline.
            </p>
          </CardContent>
          <CardFooter className="text-xs text-gray-400">
            <IoMdTime className="mr-2" size={14} />
            2025-02-20
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ToDoTask;
<h1>todo</h1>;
