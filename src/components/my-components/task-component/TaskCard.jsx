import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IoMdTime } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import DialogDemo from "./DialogDemo";

const TaskCard = ({ task }) => {
   
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this task?")) {
      await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "DELETE",
      });
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border border-gray-300 shadow-sm p-2 m-2">
        <div {...attributes} {...listeners}>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <p>{task.title}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{task.description}</p>
          </CardContent>
        </div>

        <CardFooter className="text-xs flex justify-between text-gray-400">
          <div className="flex">
            <IoMdTime className="mr-2" size={14} />
            <span>{new Date(task.timestamp).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-2">
            <DialogDemo task={task} />
            <Button className="text-4xl" onClick={handleDelete}>
              <MdDeleteForever  size={32}  />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskCard;
