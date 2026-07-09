import { ApiError } from "../../helpers/http-error.js"
import { memberRepository } from "./member.repository.js"
import { toMemberResponse } from "./member.mapper.js"

async function requireMember(id) {
  const member = await memberRepository.findById(id)
  if (!member) throw ApiError.notFound("Membre introuvable")
  return member
}

export const memberService = {
  async list() {
    const members = await memberRepository.findAll()
    return members.map(toMemberResponse)
  },

  async create(input) {
    const member = await memberRepository.create(input)
    return toMemberResponse(member)
  },

  async update(id, patch) {
    await requireMember(id)
    const member = await memberRepository.update(id, patch)
    return toMemberResponse(member)
  },

  async remove(id) {
    await requireMember(id)
    await memberRepository.remove(id)
  },
}
