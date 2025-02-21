import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdTime } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TaskCard = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Trying React Assignment");
  const [description, setDescription] = useState(
    "Work on the new React assignment and submit before the deadline."
  );

  const handleUpdate = () => {
    console.log("Updated:", { title, description });
    setOpen(false);
  };
// hellew
  return (
    <div className="p-2">
      <Card className="border border-gray-300 shadow-sm p-4">
        {/* Left-aligned Content */}
        <div className="flex flex-col gap-2">
          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(true)}
            >
              <FiEdit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => console.log("Delete function called")}
            >
              <FiTrash2 size={16} />
            </Button>
          </div>

          {/* Title */}
          <CardHeader className="p-0">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </CardHeader>

          {/* Description */}
          <CardContent className="p-0">
            <p className="text-sm text-gray-500">{description}</p>
          </CardContent>

          {/* Date */}
          <CardFooter className="p-0 text-xs text-gray-400 flex items-center">
            <IoMdTime className="mr-2" size={14} />
            2025-02-20
          </CardFooter>
        </div>
      </Card>

      {/* Update Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-6 max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              maxLength={50}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description (optional)"
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCard;
