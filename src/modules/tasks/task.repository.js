import { prisma } from "../../config/prisma.js"

const taskInclude = { labels: true }

export const taskRepository = {
  findAll() {
    return prisma.task.findMany({ include: taskInclude, orderBy: [{ status: "asc" }, { order: "asc" }] })
  },

  findById(id) {
    return prisma.task.findUnique({ where: { id }, include: taskInclude })
  },

  countByStatus(status) {
    return prisma.task.count({ where: { status } })
  },

  create({ labelIds, dueDate, ...data }) {
    return prisma.task.create({
      data: {
        ...data,
        dueDate: dueDate ? new Date(dueDate) : null,
        labels: { create: labelIds.map((labelId) => ({ labelId })) },
      },
      include: taskInclude,
    })
  },

  update(id, { labelIds, dueDate, ...data }) {
    return prisma.$transaction(async (tx) => {
      if (labelIds !== undefined) {
        await tx.taskLabel.deleteMany({ where: { taskId: id } })
      }
      return tx.task.update({
        where: { id },
        data: {
          ...data,
          ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}),
          ...(labelIds !== undefined ? { labels: { create: labelIds.map((labelId) => ({ labelId })) } } : {}),
        },
        include: taskInclude,
      })
    })
  },

  remove(id) {
    return prisma.task.delete({ where: { id } })
  },

  reorderMany(items) {
    return prisma.$transaction(
      items.map((item) =>
        prisma.task.update({ where: { id: item.id }, data: { status: item.status, order: item.order } })
      )
    )
  },
}
