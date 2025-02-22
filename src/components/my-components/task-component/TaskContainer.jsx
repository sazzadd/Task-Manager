import { AuthContext } from "@/AuthProvider/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import socket from "@/utils/socket";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { useContext, useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import FinishedTask from "./FinishedTask";
import InprogressTasks from "./InprogressTasks";
import TaskCard from "./TaskCard";
import ToDoTask from "./ToDoTask";

const TaskContainer = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("to-do");
  const [tasks, setTasks] = useState([]);
  const [activeStatus, setActiveStatus] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    fetchTasks();

    socket.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
    });

    socket.on("taskDeleted", (deletedTaskId) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTaskId)
      );
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(
      `https://task-manager-server-production-7101.up.railway.app/tasks?email=${userEmail}`
    );
    const data = await response.json();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const newTask = { title, description, category, userEmail, timestamp };
    const response = await fetch(
      "https://task-manager-server-production-7101.up.railway.app/tasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }
    );
    const data = await response.json();
    setTasks([...tasks, data]);
    setOpen(false);
    setTitle("");
    setDescription("");
    setCategory("to-do");
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    const activeTask = tasks.find((task) => task._id === active.id);
    setActiveStatus(activeTask.category);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overCategory = over.id;

    if (activeTask.category !== overCategory) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task._id === active.id);
        const newIndex = tasks.filter(
          (task) => task.category === overCategory
        ).length;
        const updatedTask = { ...activeTask, category: overCategory };
        const newTasks = [...tasks];
        newTasks.splice(oldIndex, 1);
        newTasks.splice(newIndex, 0, updatedTask);
        return newTasks;
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const overCategory = over.id;
    // console.log(activeTask);

    if (activeStatus !== overCategory) {
      updateTaskCategory(active.id, overCategory);
    }

    setActiveId(null);
    setActiveStatus(null);
  };

  const updateTaskCategory = async (taskId, newCategory) => {
    const response = await fetch(
      `https://task-manager-server-production-7101.up.railway.app/tasks/${taskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      }
    );
    const updatedTask = await response.json();
    setTasks((tasks) =>
      tasks.map((task) =>
        task._id === taskId ? { ...task, category: newCategory } : task
      )
    );
  };

  return (
    <div className="overflow-hidden flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <h1 className="text-center text-3xl py-8 font-bold">Manage your task</h1>

      <div>
        <Button onClick={() => setOpen(true)}>
          Add Task
          <FaPlusSquare />
        </Button>
      </div>

      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="lg:flex-1 mt-8 lg:flex gap-5 overflow-hidden">
          <ToDoTask tasks={tasks.filter((task) => task.category === "to-do")} />
          <InprogressTasks
            tasks={tasks.filter((task) => task.category === "inprogress")}
          />
          <FinishedTask
            tasks={tasks.filter((task) => task.category === "finished")}
          />
        </div>

        <DragOverlay>
          {activeId ? (
            <TaskCard task={tasks.find((task) => task._id === activeId)} />
          ) : null}
        </DragOverlay>
      </DndContext>

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
            <div>
              <label className="block text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-do">To-Do</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" type="submit">
                Add Task
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskContainer;
