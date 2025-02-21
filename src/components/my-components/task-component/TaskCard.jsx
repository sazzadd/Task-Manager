"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IoMdTime } from "react-icons/io"
import { FaEdit, FaTrash } from "react-icons/fa"

const TaskCard = ({ task, onUpdateTask, onDeleteTask, isDragging }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleUpdate = () => {
    onUpdateTask(task._id, { title: editedTitle, description: editedDescription })
    setIsEditing(false)
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="border border-gray-300 shadow-sm p-2 cursor-move mb-2">
        {isEditing ? (
          <div className="space-y-2">
            <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} placeholder="Task title" />
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Task description"
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save</Button>
            </div>
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-row justify-between items-center p-2">
              <CardTitle className="text-base font-medium">{task.title}</CardTitle>
              <div className="flex space-x-2">
                <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                  <FaEdit />
                </Button>
                <Button onClick={() => onDeleteTask(task._id)} size="sm" variant="outline" className="text-red-500">
                  <FaTrash />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-sm text-gray-500">{task.description}</p>
            </CardContent>
            <CardFooter className="text-xs text-gray-400 p-2">
              <IoMdTime className="mr-2" size={14} />
              {new Date(task.timestamp).toLocaleDateString()}
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

export default TaskCard

