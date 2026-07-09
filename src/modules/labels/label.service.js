import { ApiError } from "../../helpers/http-error.js"
import { labelRepository } from "./label.repository.js"
import { toLabelResponse } from "./label.mapper.js"

async function requireLabel(id) {
  const label = await labelRepository.findById(id)
  if (!label) throw ApiError.notFound("Étiquette introuvable")
  return label
}

export const labelService = {
  async list() {
    const labels = await labelRepository.findAll()
    return labels.map(toLabelResponse)
  },

  async create(input) {
    const label = await labelRepository.create(input)
    return toLabelResponse(label)
  },

  async update(id, patch) {
    await requireLabel(id)
    const label = await labelRepository.update(id, patch)
    return toLabelResponse(label)
  },

  async remove(id) {
    await requireLabel(id)
    await labelRepository.remove(id)
  },
}
