export function toMemberResponse(member) {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
    color: member.color,
    createdAt: member.createdAt.toISOString(),
  }
}
