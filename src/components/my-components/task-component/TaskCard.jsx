import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IoMdTime } from "react-icons/io";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="border mb-2 border-gray-300 shadow-sm p-2 cursor-move">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {task.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{task.description}</p>
        </CardContent>
        <CardFooter className="text-xs text-gray-400">
          <IoMdTime className="mr-2" size={14} />
          {new Date(task.timestamp).toLocaleDateString()}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskCard;
