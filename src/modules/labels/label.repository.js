import { prisma } from "../../config/prisma.js"

export const labelRepository = {
  findAll() {
    return prisma.label.findMany({ orderBy: { name: "asc" } })
  },

  findById(id) {
    return prisma.label.findUnique({ where: { id } })
  },

  findManyByIds(ids) {
    return prisma.label.findMany({ where: { id: { in: ids } } })
  },

  create(data) {
    return prisma.label.create({ data })
  },

  update(id, data) {
    return prisma.label.update({ where: { id }, data })
  },

  remove(id) {
    return prisma.label.delete({ where: { id } })
  },
}
