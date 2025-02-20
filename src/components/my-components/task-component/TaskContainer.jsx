import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FinishedTask from "./FinishedTask";
import InprogressTasks from "./InprogressTasks";
import ToDoTask from "./ToDoTask";

const TaskContainer = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description });

    // এখানে API কল করে নতুন টাস্ক যোগ করতে পারবে
    // fetch("/api/tasks", { method: "POST", body: JSON.stringify({ title, description }) });

    setOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="overflow-hidden flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <h1 className="text-center text-3xl py-8 font-bold">Manage your task</h1>

      {/* Add Task Button */}
      <div>
        <Button onClick={() => setOpen(true)}>Add Task</Button>
      </div>

      {/* Modal/Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                required
                maxLength={50}
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <Textarea
                maxLength={200}
                placeholder="Enter task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Task Sections */}
      <div className="lg:flex-1 mt-8 lg:flex gap-5 overflow-hidden">
        <ToDoTask />
        <InprogressTasks />
        <FinishedTask />
      </div>
    </div>
  );
};

export default TaskContainer;
