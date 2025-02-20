import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IoMdTime } from "react-icons/io";

const TaskCard = () => {
  return (
    <div className="p-2">
      <Card className="border border-gray-300 shadow-sm p-2">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            Trying React Assignment
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
  );
};
export default TaskCard;
