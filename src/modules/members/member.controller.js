import { memberService } from "./member.service.js"

export const memberController = {
  async list(req, res) {
    res.json(await memberService.list())
  },

  async create(req, res) {
    res.status(201).json(await memberService.create(req.body))
  },

  async update(req, res) {
    res.json(await memberService.update(req.params.id, req.body))
  },

  async remove(req, res) {
    await memberService.remove(req.params.id)
    res.status(204).send()
  },
}
