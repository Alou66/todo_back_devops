import { prisma } from "../../config/prisma.js"

export const memberRepository = {
  findAll() {
    return prisma.member.findMany({ orderBy: { createdAt: "asc" } })
  },

  findById(id) {
    return prisma.member.findUnique({ where: { id } })
  },

  create(data) {
    return prisma.member.create({ data })
  },

  update(id, data) {
    return prisma.member.update({ where: { id }, data })
  },

  remove(id) {
    return prisma.member.delete({ where: { id } })
  },
}
