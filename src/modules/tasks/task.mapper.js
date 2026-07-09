function toDateOnly(date) {
  return date.toISOString().slice(0, 10)
}

export function toTaskResponse(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? toDateOnly(task.dueDate) : null,
    assigneeId: task.assigneeId,
    labelIds: task.labels.map((taskLabel) => taskLabel.labelId),
    order: task.order,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }
}
