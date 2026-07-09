import { ApiError } from "../../helpers/http-error.js"
import { taskRepository } from "./task.repository.js"
import { memberRepository } from "../members/member.repository.js"
import { labelRepository } from "../labels/label.repository.js"
import { toTaskResponse } from "./task.mapper.js"

async function requireTask(id) {
  const task = await taskRepository.findById(id)
  if (!task) throw ApiError.notFound("Tâche introuvable")
  return task
}

async function assertAssigneeExists(assigneeId) {
  if (!assigneeId) return
  const member = await memberRepository.findById(assigneeId)
  if (!member) throw ApiError.badRequest("Membre assigné introuvable")
}

async function assertLabelsExist(labelIds) {
  if (!labelIds || labelIds.length === 0) return
  const labels = await labelRepository.findManyByIds(labelIds)
  if (labels.length !== new Set(labelIds).size) {
    throw ApiError.badRequest("Une ou plusieurs étiquettes sont introuvables")
  }
}

export const taskService = {
  async list() {
    const tasks = await taskRepository.findAll()
    return tasks.map(toTaskResponse)
  },

  async create(input) {
    await assertAssigneeExists(input.assigneeId)
    await assertLabelsExist(input.labelIds)
    const order = await taskRepository.countByStatus(input.status)
    const task = await taskRepository.create({ ...input, order })
    return toTaskResponse(task)
  },

  async update(id, patch) {
    await requireTask(id)
    if (patch.assigneeId !== undefined) await assertAssigneeExists(patch.assigneeId)
    if (patch.labelIds !== undefined) await assertLabelsExist(patch.labelIds)
    const task = await taskRepository.update(id, patch)
    return toTaskResponse(task)
  },

  async remove(id) {
    await requireTask(id)
    await taskRepository.remove(id)
  },

  async reorder(items) {
    await Promise.all(items.map((item) => requireTask(item.id)))
    await taskRepository.reorderMany(items)
    return taskService.list()
  },
}
