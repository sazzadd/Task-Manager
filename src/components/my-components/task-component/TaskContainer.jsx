import FinishedTask from "./FinishedTask";
import InprogressTasks from "./InprogressTasks";
import ToDoTask from "./ToDoTask";

const TaskContainer = () => {
  return (
    <div className="overflow-hidden  flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <h1 className="text-center text-3xl font-bold">Manage your task </h1>
      <div className="lg:flex-1 mt-8 lg:flex gap-5 overflow-hidden">
        <ToDoTask></ToDoTask>
        <InprogressTasks></InprogressTasks>
        <FinishedTask></FinishedTask>
      </div>
    </div>
  );
};

export default TaskContainer;
