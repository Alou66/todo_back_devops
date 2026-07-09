import { taskService } from "./task.service.js"

export const taskController = {
  async list(req, res) {
    res.json(await taskService.list())
  },

  async create(req, res) {
    res.status(201).json(await taskService.create(req.body))
  },

  async update(req, res) {
    res.json(await taskService.update(req.params.id, req.body))
  },

  async remove(req, res) {
    await taskService.remove(req.params.id)
    res.status(204).send()
  },

  async reorder(req, res) {
    res.json(await taskService.reorder(req.body))
  },
}
