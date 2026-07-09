import { labelService } from "./label.service.js"

export const labelController = {
  async list(req, res) {
    res.json(await labelService.list())
  },

  async create(req, res) {
    res.status(201).json(await labelService.create(req.body))
  },

  async update(req, res) {
    res.json(await labelService.update(req.params.id, req.body))
  },

  async remove(req, res) {
    await labelService.remove(req.params.id)
    res.status(204).send()
  },
}
