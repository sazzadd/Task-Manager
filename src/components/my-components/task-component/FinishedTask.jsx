import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaCheckDouble } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const FinishedTask = () => {
  return (
    <div className="lg:flex-1 bg-secondary/40 rounded-md  h-full overflow-y-auto">
      <h4 className="sticky flex p-4 top-0 font-bold bg-green-400  py-5 text-xl">
        <span className="mt-1 mr-1">
          <FaCheckDouble />
        </span>{" "}
        Finished
      </h4>
      <div className="p-2">
        <Card className="border border-gray-300 shadow-sm p-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              finished React Assignment
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

export default FinishedTask;
