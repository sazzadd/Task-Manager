"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useContext, useEffect, useState } from "react";
import FinishedTask from "./FinishedTask";
import InprogressTasks from "./InprogressTasks";
import TaskCard from "./TaskCard";
import ToDoTask from "./ToDoTask";

import { AuthContext } from "@/AuthProvider/AuthProvider";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const TaskContainer = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const { user } = useContext(AuthContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (user) {
      fetchTasks();
    }

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
  }, [user]);

  const fetchTasks = async () => {
    const response = await fetch(`http://localhost:5000/tasks/${user.uid}`);
    const data = await response.json();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      category: "To-Do",
      userId: user.uid,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      setOpen(false);
      setTitle("");
      setDescription("");
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        const updatedTask = {
          ...newItems[newIndex],
          category: over.data.current.sortable.containerId,
        };

        fetch(`http://localhost:5000/tasks/${updatedTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });

        return newItems.map((item, index) =>
          index === newIndex ? updatedTask : item
        );
      });
    }
    setActiveId(null);
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedData } : task
        )
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    }
  };

  return (
    <div className="overflow-hidden flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <h1 className="text-center text-3xl py-8 font-bold">Manage your tasks</h1>

      <div>
        <Button onClick={() => setOpen(true)}>Add Task</Button>
      </div>

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
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="lg:flex-1 mt-8 lg:flex gap-5 overflow-hidden">
          <ToDoTask
            tasks={tasks.filter((task) => task.category === "To-Do")}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
          <InprogressTasks
            tasks={tasks.filter((task) => task.category === "In Progress")}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
          <FinishedTask
            tasks={tasks.filter((task) => task.category === "Done")}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        <DragOverlay>
          {activeId ? (
            <TaskCard
              task={tasks.find((task) => task._id === activeId)}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskContainer;
